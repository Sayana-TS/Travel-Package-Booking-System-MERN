import { processUploadedFiles, generateThumbnail } from "../utils/fileUpload.js";
import Gallery from "../models/gallery.js";
import Hotel from "../models/hotelModel.js";
import Package from "../models/packageModel.js";
import Agent from "../models/agentModel.js";
import mongoose from "mongoose";
import path from "path";
import { v4 as uuidv4 } from "uuid";

// @desc    Get gallery management page data (Agent Flow #15)
// @route   GET /api/gallery/manage
// @access  Private (Agent only)
export const getGalleryManagement = async (req, res) => {
  try {
    const agentId = req.user.agentId;
    const { type = "hotel" } = req.query; // hotel or package

    if (!agentId) {
      return res.status(404).json({
        success: false,
        message: "Agent profile not found"
      });
    }

    // Get entities (hotels or packages) for dropdown
    let entities = [];
    let entityType = "Hotel";

    if (type === "hotel") {
      entities = await Hotel.find({ agent: agentId })
        .select("name images status")
        .sort({ name: 1 })
        .lean();
    } else if (type === "package") {
      entities = await Package.find({ agent: agentId })
        .select("title images status destination")
        .sort({ title: 1 })
        .lean();
      entityType = "Package";
    } else {
      // Agent gallery
      entityType = "Agent";
      const agent = await Agent.findById(agentId).select("businessName gallery");
      if (agent) {
        entities = [{
          _id: agentId,
          name: agent.businessName,
          gallery: agent.gallery
        }];
      }
    }

    // Format entities for dropdown
    const formattedEntities = entities.map(entity => ({
      id: entity._id,
      name: type === "package" ? entity.title : entity.name,
      image: entity.images?.find(img => img.isThumbnail)?.url || entity.images?.[0]?.url || "",
      status: entity.status,
      ...(type === "package" && { destination: entity.destination }),
      hasImages: entity.images?.length > 0,
      imageCount: entity.images?.length || 0
    }));

    // If an entity is selected, check if it has a gallery or just direct images
    let selectedGallery = null;
    const { entityId } = req.query;

    if (entityId) {
      // First try to get from Gallery model
      selectedGallery = await Gallery.findOne({
        agent: agentId,
        entityId,
        entityType
      }).lean();

      // If no gallery exists in Gallery model, check for direct images
      if (!selectedGallery) {
        const entity = type === "package" 
          ? await Package.findById(entityId).select("title images")
          : await Hotel.findById(entityId).select("name images");

        selectedGallery = {
          entityId,
          entityType,
          agent: agentId,
          title: type === "package" ? entity?.title : entity?.name,
          source: "direct_images", // Mark as from direct images, not Gallery model
          images: {
            landscape: [],
            activities: [],
            cuisine: [],
            accommodation: entity?.images?.map((img, index) => ({
              url: img.url,
              thumbnailUrl: img.url,
              fileName: `image_${index}.jpg`,
              isFeatured: img.isThumbnail || false,
              uploadOrder: index
            })) || [],
            other: []
          },
          stats: {
            totalImages: entity?.images?.length || 0,
            storageUsed: 0
          }
        };
      }
    }

    res.status(200).json({
      success: true,
      type,
      entities: formattedEntities,
      selectedEntity: entityId || null,
      gallery: selectedGallery,
      note: selectedGallery?.source === "direct_images" 
        ? "Using direct images from hotel/package (Gallery model not seeded)" 
        : "Using Gallery model",
      categories: [
        { id: "landscape", name: "Landscape", icon: "🌄", description: "Scenic views and locations" },
        { id: "activities", name: "Activities", icon: "🚴", description: "Tour activities and experiences" },
        { id: "cuisine", name: "Cuisine", icon: "🍽️", description: "Food and dining experiences" },
        { id: "accommodation", name: "Accommodation", icon: "🏨", description: "Hotels, rooms, and amenities" },
        { id: "other", name: "Other", icon: "📷", description: "Miscellaneous photos" }
      ]
    });

  } catch (err) {
    console.error("Get gallery management error:", err);
    res.status(500).json({
      success: false,
      message: "Error fetching gallery management data",
      error: process.env.NODE_ENV === "development" ? err.message : undefined
    });
  }
};

// @desc    Upload images to gallery (Agent Flow #15)
// @route   POST /api/gallery/upload
// @access  Private (Agent only)
export const uploadImages = async (req, res) => {
  try {
    const agentId = req.user.agentId;
    const { entityId, entityType, category, images } = req.body;

    // Validate inputs
    if (!entityId || !entityType || !category || !images || !Array.isArray(images)) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields: entityId, entityType, category, and images array"
      });
    }

    // Validate entityType
    if (!["Hotel", "Package", "Agent"].includes(entityType)) {
      return res.status(400).json({
        success: false,
        message: "Invalid entity type. Must be Hotel, Package, or Agent"
      });
    }

    // Validate category
    if (!["landscape", "activities", "cuisine", "accommodation", "other"].includes(category)) {
      return res.status(400).json({
        success: false,
        message: "Invalid category"
      });
    }

    // Verify agent owns the entity
    let hasAccess = false;
    
    if (entityType === "Hotel") {
      const hotel = await Hotel.findOne({ _id: entityId, agent: agentId });
      hasAccess = !!hotel;
    } else if (entityType === "Package") {
      const pkg = await Package.findOne({ _id: entityId, agent: agentId });
      hasAccess = !!pkg;
    } else if (entityType === "Agent") {
      hasAccess = entityId === agentId.toString();
    }

    if (!hasAccess) {
      return res.status(403).json({
        success: false,
        message: "Access denied to this entity"
      });
    }

    // Find or create gallery
    let gallery = await Gallery.findOne({
      entityId,
      entityType,
      agent: agentId
    });

    if (!gallery) {
      // Get entity name for gallery title
      let entityName = "Gallery";
      if (entityType === "Hotel") {
        const hotel = await Hotel.findById(entityId).select("name");
        entityName = hotel?.name || "Hotel Gallery";
      } else if (entityType === "Package") {
        const pkg = await Package.findById(entityId).select("title");
        entityName = pkg?.title || "Package Gallery";
      } else {
        const agent = await Agent.findById(agentId).select("businessName");
        entityName = agent?.businessName || "Agent Gallery";
      }

      gallery = await Gallery.create({
        entityId,
        entityType,
        agent: agentId,
        title: `${entityName} Gallery`,
        images: {
          landscape: [],
          activities: [],
          cuisine: [],
          accommodation: [],
          other: []
        },
        stats: {
          totalImages: 0,
          storageUsed: 0
        }
      });
    }

    // Process uploaded images
    const uploadedImages = [];
    let totalSize = 0;

    for (const imageData of images) {
      // Generate unique filename
      const fileId = uuidv4();
      const fileExt = path.extname(imageData.fileName || "image.jpg");
      const fileName = `${fileId}${fileExt}`;
      
      // In production, you would save the file to storage (S3, Cloudinary, etc.)
      // For now, we'll store the base64/data URL or assume file is already uploaded
      const galleryItem = {
        url: imageData.url || `/uploads/${fileName}`,
        thumbnailUrl: imageData.thumbnailUrl || imageData.url,
        fileName: imageData.fileName || fileName,
        fileSize: imageData.fileSize || 0,
        mimeType: imageData.mimeType || "image/jpeg",
        dimensions: imageData.dimensions || { width: 1920, height: 1080 },
        caption: imageData.caption || "",
        tags: imageData.tags || [],
        category,
        isFeatured: imageData.isFeatured || false,
        uploadOrder: gallery.images[category].length,
        metadata: {
          uploadedBy: req.user._id,
          uploadedAt: new Date()
        }
      };

      uploadedImages.push(galleryItem);
      totalSize += galleryItem.fileSize;
    }

    // Add images to the category
    gallery.images[category].push(...uploadedImages);
    
    // Update stats
    gallery.stats.totalImages += uploadedImages.length;
    gallery.stats.storageUsed += totalSize;
    gallery.stats.lastUpload = new Date();
    
    // Update entity's main image if this is the first upload
    if (gallery.images[category].length === uploadedImages.length) {
      if (!gallery.coverImage && uploadedImages[0]) {
        gallery.coverImage = uploadedImages[0].url;
      }
    }

    await gallery.save();

    // Also update the entity's images array if applicable
    if (entityType === "Hotel") {
      await Hotel.findByIdAndUpdate(entityId, {
        $addToSet: {
          images: {
            $each: uploadedImages.map(img => ({
              url: img.url,
              isThumbnail: img.isFeatured || false
            }))
          }
        }
      });
    } else if (entityType === "Package") {
      await Package.findByIdAndUpdate(entityId, {
        $addToSet: {
          images: {
            $each: uploadedImages.map(img => ({
              url: img.url,
              isThumbnail: img.isFeatured || false
            }))
          }
        }
      });
    } else if (entityType === "Agent") {
      await Agent.findByIdAndUpdate(agentId, {
        $addToSet: {
          [`gallery.${category}`]: {
            $each: uploadedImages.map(img => img.url)
          }
        }
      });
    }

    res.status(201).json({
      success: true,
      message: `Uploaded ${uploadedImages.length} images to ${category}`,
      uploadedCount: uploadedImages.length,
      category,
      images: uploadedImages,
      galleryStats: gallery.stats
    });

  } catch (err) {
    console.error("Upload images error:", err);
    res.status(500).json({
      success: false,
      message: "Error uploading images",
      error: process.env.NODE_ENV === "development" ? err.message : undefined
    });
  }
};

// @desc    Delete image from gallery (Agent Flow #15)
// @route   DELETE /api/gallery/image/:imageId
// @access  Private (Agent only)
export const deleteImage = async (req, res) => {
  try {
    const agentId = req.user.agentId;
    const { imageId } = req.params;
    const { entityId, entityType, category } = req.body;

    if (!entityId || !entityType || !category) {
      return res.status(400).json({
        success: false,
        message: "entityId, entityType, and category are required"
      });
    }

    // Find gallery
    const gallery = await Gallery.findOne({
      entityId,
      entityType,
      agent: agentId
    });

    if (!gallery) {
      return res.status(404).json({
        success: false,
        message: "Gallery not found"
      });
    }

    // Find image index in category
    const categoryImages = gallery.images[category];
    if (!categoryImages) {
      return res.status(400).json({
        success: false,
        message: "Invalid category"
      });
    }

    const imageIndex = categoryImages.findIndex(img => 
      img._id.toString() === imageId || img.url.includes(imageId)
    );

    if (imageIndex === -1) {
      return res.status(404).json({
        success: false,
        message: "Image not found in gallery"
      });
    }

    const deletedImage = categoryImages[imageIndex];

    // Remove image from array
    gallery.images[category].splice(imageIndex, 1);
    
    // Update stats
    gallery.stats.totalImages -= 1;
    gallery.stats.storageUsed = Math.max(0, gallery.stats.storageUsed - (deletedImage.fileSize || 0));
    
    // Update cover image if deleted image was cover
    if (gallery.coverImage === deletedImage.url) {
      gallery.coverImage = gallery.images[category]?.[0]?.url || 
                          gallery.images.landscape?.[0]?.url ||
                          gallery.images.activities?.[0]?.url ||
                          null;
    }

    // Reorder remaining images
    gallery.images[category].forEach((img, index) => {
      img.uploadOrder = index;
    });

    await gallery.save();

    // Also remove from entity if applicable
    if (entityType === "Hotel") {
      await Hotel.findByIdAndUpdate(entityId, {
        $pull: { images: { url: deletedImage.url } }
      });
    } else if (entityType === "Package") {
      await Package.findByIdAndUpdate(entityId, {
        $pull: { images: { url: deletedImage.url } }
      });
    } else if (entityType === "Agent") {
      await Agent.findByIdAndUpdate(agentId, {
        $pull: { [`gallery.${category}`]: deletedImage.url }
      });
    }

    res.status(200).json({
      success: true,
      message: "Image deleted successfully",
      deletedImage: {
        id: imageId,
        url: deletedImage.url,
        fileName: deletedImage.fileName
      },
      galleryStats: gallery.stats
    });

  } catch (err) {
    console.error("Delete image error:", err);
    res.status(500).json({
      success: false,
      message: "Error deleting image",
      error: process.env.NODE_ENV === "development" ? err.message : undefined
    });
  }
};

// @desc    Set image as thumbnail/featured (Agent Flow #15)
// @route   PATCH /api/gallery/image/:imageId/feature
// @access  Private (Agent only)
export const setAsFeatured = async (req, res) => {
  try {
    const agentId = req.user.agentId;
    const { imageId } = req.params;
    const { entityId, entityType, category, isFeatured = true } = req.body;

    if (!entityId || !entityType || !category) {
      return res.status(400).json({
        success: false,
        message: "entityId, entityType, and category are required"
      });
    }

    // Find gallery
    const gallery = await Gallery.findOne({
      entityId,
      entityType,
      agent: agentId
    });

    if (!gallery) {
      return res.status(404).json({
        success: false,
        message: "Gallery not found"
      });
    }

    // Find image in category
    const categoryImages = gallery.images[category];
    if (!categoryImages) {
      return res.status(400).json({
        success: false,
        message: "Invalid category"
      });
    }

    // First, set all images in this category as not featured
    categoryImages.forEach(img => {
      img.isFeatured = false;
    });

    // Then set the specific image as featured
    const imageIndex = categoryImages.findIndex(img => 
      img._id.toString() === imageId || img.url.includes(imageId)
    );

    if (imageIndex === -1) {
      return res.status(404).json({
        success: false,
        message: "Image not found in gallery"
      });
    }

    categoryImages[imageIndex].isFeatured = isFeatured;
    
    // Update gallery cover image if this is being set as featured
    if (isFeatured) {
      gallery.coverImage = categoryImages[imageIndex].url;
    }

    await gallery.save();

    // Also update entity thumbnail if applicable
    if (entityType === "Hotel" || entityType === "Package") {
      const Model = entityType === "Hotel" ? Hotel : Package;
      await Model.updateOne(
        { 
          _id: entityId,
          "images.url": categoryImages[imageIndex].url 
        },
        { 
          $set: { 
            "images.$.isThumbnail": isFeatured 
          }
        }
      );
    }

    res.status(200).json({
      success: true,
      message: isFeatured ? "Image set as featured" : "Image unfeatured",
      image: {
        id: imageId,
        url: categoryImages[imageIndex].url,
        isFeatured: categoryImages[imageIndex].isFeatured
      }
    });

  } catch (err) {
    console.error("Set featured image error:", err);
    res.status(500).json({
      success: false,
      message: "Error updating featured image",
      error: process.env.NODE_ENV === "development" ? err.message : undefined
    });
  }
};

// @desc    Reorder gallery images (Agent Flow #15)
// @route   PATCH /api/gallery/reorder
// @access  Private (Agent only)
export const reorderImages = async (req, res) => {
  try {
    const agentId = req.user.agentId;
    const { entityId, entityType, category, imageOrder } = req.body;

    if (!entityId || !entityType || !category || !Array.isArray(imageOrder)) {
      return res.status(400).json({
        success: false,
        message: "entityId, entityType, category, and imageOrder array are required"
      });
    }

    // Find gallery
    const gallery = await Gallery.findOne({
      entityId,
      entityType,
      agent: agentId
    });

    if (!gallery) {
      return res.status(404).json({
        success: false,
        message: "Gallery not found"
      });
    }

    // Reorder images based on provided order
    const categoryImages = gallery.images[category];
    if (!categoryImages) {
      return res.status(400).json({
        success: false,
        message: "Invalid category"
      });
    }

    // Create a map of image URLs to objects for quick lookup
    const imageMap = new Map();
    categoryImages.forEach(img => {
      const key = img._id.toString();
      imageMap.set(key, img);
    });

    // Rebuild array in new order
    const reorderedImages = [];
    imageOrder.forEach(imageId => {
      const image = imageMap.get(imageId);
      if (image) {
        image.uploadOrder = reorderedImages.length;
        reorderedImages.push(image);
      }
    });

    // Add any images not in the order array (shouldn't happen, but just in case)
    categoryImages.forEach(img => {
      if (!imageOrder.includes(img._id.toString())) {
        img.uploadOrder = reorderedImages.length;
        reorderedImages.push(img);
      }
    });

    gallery.images[category] = reorderedImages;
    await gallery.save();

    res.status(200).json({
      success: true,
      message: "Images reordered successfully",
      category,
      imageCount: reorderedImages.length,
      order: reorderedImages.map(img => ({
        id: img._id,
        url: img.url,
        order: img.uploadOrder
      }))
    });

  } catch (err) {
    console.error("Reorder images error:", err);
    res.status(500).json({
      success: false,
      message: "Error reordering images",
      error: process.env.NODE_ENV === "development" ? err.message : undefined
    });
  }
};

// @desc    Bulk delete images (Agent Flow #15)
// @route   DELETE /api/gallery/bulk-delete
// @access  Private (Agent only)
export const bulkDeleteImages = async (req, res) => {
  try {
    const agentId = req.user.agentId;
    const { entityId, entityType, category, imageIds } = req.body;

    if (!entityId || !entityType || !category || !Array.isArray(imageIds)) {
      return res.status(400).json({
        success: false,
        message: "entityId, entityType, category, and imageIds array are required"
      });
    }

    // Find gallery
    const gallery = await Gallery.findOne({
      entityId,
      entityType,
      agent: agentId
    });

    if (!gallery) {
      return res.status(404).json({
        success: false,
        message: "Gallery not found"
      });
    }

    const categoryImages = gallery.images[category];
    if (!categoryImages) {
      return res.status(400).json({
        success: false,
        message: "Invalid category"
      });
    }

    // Filter out images to delete
    const imagesToDelete = categoryImages.filter(img => 
      imageIds.includes(img._id.toString()) || 
      imageIds.some(id => img.url.includes(id))
    );

    const remainingImages = categoryImages.filter(img => 
      !imageIds.includes(img._id.toString()) && 
      !imageIds.some(id => img.url.includes(id))
    );

    // Update gallery
    gallery.images[category] = remainingImages;
    
    // Update stats
    const deletedSize = imagesToDelete.reduce((sum, img) => sum + (img.fileSize || 0), 0);
    gallery.stats.totalImages -= imagesToDelete.length;
    gallery.stats.storageUsed = Math.max(0, gallery.stats.storageUsed - deletedSize);
    
    // Reorder remaining images
    remainingImages.forEach((img, index) => {
      img.uploadOrder = index;
    });

    await gallery.save();

    // Also remove from entity if applicable
    if (entityType === "Hotel") {
      await Hotel.findByIdAndUpdate(entityId, {
        $pull: { 
          images: { 
            url: { $in: imagesToDelete.map(img => img.url) } 
          } 
        }
      });
    } else if (entityType === "Package") {
      await Package.findByIdAndUpdate(entityId, {
        $pull: { 
          images: { 
            url: { $in: imagesToDelete.map(img => img.url) } 
          } 
        }
      });
    } else if (entityType === "Agent") {
      await Agent.findByIdAndUpdate(agentId, {
        $pull: { 
          [`gallery.${category}`]: { 
            $in: imagesToDelete.map(img => img.url) 
          } 
        }
      });
    }

    res.status(200).json({
      success: true,
      message: `Deleted ${imagesToDelete.length} images`,
      deletedCount: imagesToDelete.length,
      remainingCount: remainingImages.length,
      deletedImages: imagesToDelete.map(img => ({
        id: img._id,
        url: img.url,
        fileName: img.fileName
      }))
    });

  } catch (err) {
    console.error("Bulk delete images error:", err);
    res.status(500).json({
      success: false,
      message: "Error deleting images",
      error: process.env.NODE_ENV === "development" ? err.message : undefined
    });
  }
};

// @desc    Get gallery for public viewing
// @route   GET /api/gallery/public/:entityType/:entityId
// @access  Public
// Update the getPublicGallery function with more debugging:

export const getPublicGallery = async (req, res) => {
  try {
    const { entityType, entityId } = req.params;
    const { category, limit = 50 } = req.query;

    console.log("=== GALLERY DEBUG START ===");
    console.log("Request params:", { entityType, entityId });
    console.log("Query params:", { category, limit });

    // Validate entityType
    if (!["Hotel", "Package", "Agent"].includes(entityType)) {
      console.log("Invalid entity type:", entityType);
      return res.status(400).json({
        success: false,
        message: "Invalid entity type. Must be Hotel, Package, or Agent"
      });
    }

    // Validate ID
    if (!mongoose.Types.ObjectId.isValid(entityId)) {
      console.log("Invalid ObjectId:", entityId);
      return res.status(400).json({
        success: false,
        message: "Invalid ID format. Must be a valid MongoDB ObjectId",
        hint: "Get valid IDs from /api/gallery/status",
        yourInput: entityId
      });
    }

    const objectId = new mongoose.Types.ObjectId(entityId);
    console.log("Converted to ObjectId:", objectId);
    
    // FIRST: Try to get from Gallery model (if it exists)
    const gallery = await Gallery.findOne({
      entityId: objectId,
      entityType,
      isPublic: true
    }).lean();

    console.log("Gallery model search result:", gallery ? "FOUND" : "NOT FOUND");

    // If gallery exists in Gallery model, return it
    if (gallery) {
      console.log("Found gallery in Gallery model, image count:", gallery.stats?.totalImages);
      // ... rest of gallery return code ...
    }
    
    console.log("No gallery found in Gallery model, checking direct images...");
    
    // SECOND: Fallback to direct images from Hotel/Package models
    if (entityType === "Hotel") {
      console.log("Looking for hotel with ID:", objectId);
      const hotel = await Hotel.findById(objectId)
        .select("name images status rating")
        .lean();
      
      console.log("Hotel found:", hotel ? "YES" : "NO");
      
      if (!hotel) {
        console.log("Hotel not found in database");
        return res.status(404).json({
          success: false,
          message: "Hotel not found",
          entityId: entityId,
          objectId: objectId.toString()
        });
      }
      
      console.log("Hotel status:", hotel.status);
      console.log("Hotel has images:", hotel.images?.length || 0);
      
      if (hotel.status !== "active") {
        return res.status(400).json({
          success: false,
          message: "Hotel is not active",
          status: hotel.status
        });
      }
      
      const images = hotel.images.map((img, index) => ({
        id: `hotel_img_${index}`,
        url: img.url,
        thumbnailUrl: img.url,
        caption: "",
        category: "accommodation",
        isFeatured: img.isThumbnail || false,
        dimensions: { width: 1920, height: 1080 }
      })).slice(0, limit);
      
      console.log("Returning", images.length, "images");
      console.log("=== GALLERY DEBUG END ===");
      
      return res.status(200).json({
        success: true,
        source: "hotel_direct",
        message: "Gallery model not seeded. Using hotel's direct images.",
        gallery: {
          entityId: hotel._id,
          entityType: "Hotel",
          title: `${hotel.name} Images`,
          description: "Hotel images from direct storage",
          coverImage: hotel.images.find(img => img.isThumbnail)?.url || hotel.images[0]?.url || null,
          images,
          stats: {
            totalImages: images.length
          }
        }
      });
      
    } else if (entityType === "Package") {
      // ... package code ...
    }
    
    console.log("=== GALLERY DEBUG END ===");
    
  } catch (err) {
    console.error("=== GALLERY ERROR ===");
    console.error("Get public gallery error:", err);
    console.error("Error stack:", err.stack);
    console.error("=== GALLERY ERROR END ===");
    
    res.status(500).json({
      success: false,
      message: "Error fetching gallery",
      error: process.env.NODE_ENV === "development" ? err.message : "Internal server error",
      hint: "Check /api/gallery/status for available IDs"
    });
  }
};

// Update uploadImages function to handle file uploads
export const uploadImagesWithFiles = async (req, res) => {
    try {
      const agentId = req.user.agentId;
      const { entityId, entityType, category } = req.body;
      const files = req.files;
  
      if (!files || files.length === 0) {
        return res.status(400).json({
          success: false,
          message: "No files uploaded"
        });
      }
  
      // Process uploaded files
      const uploadedImages = processUploadedFiles(files);
  
      // Add captions from request if provided
      const captions = req.body.captions ? JSON.parse(req.body.captions) : [];
      const tags = req.body.tags ? JSON.parse(req.body.tags) : [];
  
      uploadedImages.forEach((img, index) => {
        if (captions[index]) img.caption = captions[index];
        if (tags[index]) img.tags = tags[index];
      });
  
      // Continue with existing upload logic...
      // (Use the same logic as uploadImages but with processed files)
  
    } catch (err) {
      console.error("Upload images with files error:", err);
      res.status(500).json({
        success: false,
        message: "Error uploading images",
        error: process.env.NODE_ENV === "development" ? err.message : undefined
      });
    }
  };


  export const getDatabaseStatus = async (req, res) => {
    try {
      const hotelCount = await Hotel.countDocuments();
      const packageCount = await Package.countDocuments();
      const agentCount = await Agent.countDocuments();
      const galleryCount = await Gallery.countDocuments();
      
      // Get sample hotels with images
      const sampleHotels = await Hotel.find({ 
        images: { $exists: true, $not: { $size: 0 } }
      })
      .limit(3)
      .select("_id name images")
      .lean();
      
      // Get sample packages with images
      const samplePackages = await Package.find({ 
        images: { $exists: true, $not: { $size: 0 } }
      })
      .limit(3)
      .select("_id title images")
      .lean();
      
      res.status(200).json({
        success: true,
        counts: {
          hotels: hotelCount,
          packages: packageCount,
          agents: agentCount,
          galleries: galleryCount
        },
        sampleHotels: sampleHotels.map(h => ({
          id: h._id,
          name: h.name,
          imageCount: h.images?.length || 0,
          testUrls: {
            gallery: `/api/gallery/public/Hotel/${h._id}`,
            direct: `/api/hotels/${h._id}/images`
          }
        })),
        samplePackages: samplePackages.map(p => ({
          id: p._id,
          title: p.title,
          imageCount: p.images?.length || 0,
          testUrls: {
            gallery: `/api/gallery/public/Package/${p._id}`,
            direct: `/api/packages/${p._id}/images`
          }
        })),
        instructions: {
          note: galleryCount === 0 
            ? "Gallery model is not seeded yet. Using direct images arrays from Hotel/Package models."
            : `Found ${galleryCount} galleries in database.`,
          endpoints: [
            "GET /api/gallery/public/Hotel/{hotelId} - Gallery compatibility endpoint",
            "GET /api/hotels/{hotelId}/images - Direct hotel images",
            "GET /api/packages/{packageId}/images - Direct package images"
          ]
        }
      });
      
    } catch (err) {
      console.error("Database status error:", err);
      res.status(500).json({
        success: false,
        message: "Error checking database",
        error: err.message
      });
    }
  };
  
  // @desc    Get hotel images directly (fallback when no gallery exists)
  // @route   GET /api/hotels/:hotelId/images
  // @access  Public
  export const getHotelImages = async (req, res) => {
    try {
      const { hotelId } = req.params;
      
      // Validate hotelId
      if (!mongoose.Types.ObjectId.isValid(hotelId)) {
        return res.status(400).json({
          success: false,
          message: "Invalid hotel ID format"
        });
      }
      
      const hotel = await Hotel.findById(hotelId)
        .select("name images status rating")
        .lean();
      
      if (!hotel) {
        return res.status(404).json({
          success: false,
          message: "Hotel not found"
        });
      }
      
      if (hotel.status !== "active") {
        return res.status(400).json({
          success: false,
          message: "Hotel is not active"
        });
      }
      
      // Format images
      const images = hotel.images.map((img, index) => ({
        id: `img_${index}`,
        url: img.url,
        isThumbnail: img.isThumbnail || false,
        order: index,
        caption: "",
        category: "hotel"
      }));
      
      res.status(200).json({
        success: true,
        hotel: {
          id: hotel._id,
          name: hotel.name,
          status: hotel.status,
          rating: hotel.rating
        },
        images,
        count: images.length
      });
      
    } catch (err) {
      console.error("Get hotel images error:", err);
      res.status(500).json({
        success: false,
        message: "Error fetching hotel images",
        error: process.env.NODE_ENV === "development" ? err.message : undefined
      });
    }
  };
  
  // @desc    Get package images directly (fallback when no gallery exists)
  // @route   GET /api/packages/:packageId/images
  // @access  Public
  export const getPackageImages = async (req, res) => {
    try {
      const { packageId } = req.params;
      
      // Validate packageId
      if (!mongoose.Types.ObjectId.isValid(packageId)) {
        return res.status(400).json({
          success: false,
          message: "Invalid package ID format"
        });
      }
      
      const packageDoc = await Package.findById(packageId)
        .select("title images status rating")
        .lean();
      
      if (!packageDoc) {
        return res.status(404).json({
          success: false,
          message: "Package not found"
        });
      }
      
      if (!["active", "upcoming"].includes(packageDoc.status)) {
        return res.status(400).json({
          success: false,
          message: "Package is not available"
        });
      }
      
      // Format images
      const images = packageDoc.images.map((img, index) => ({
        id: `img_${index}`,
        url: img.url,
        isThumbnail: img.isThumbnail || false,
        order: index,
        caption: "",
        category: "package"
      }));
      
      res.status(200).json({
        success: true,
        package: {
          id: packageDoc._id,
          title: packageDoc.title,
          status: packageDoc.status,
          rating: packageDoc.rating
        },
        images,
        count: images.length
      });
      
    } catch (err) {
      console.error("Get package images error:", err);
      res.status(500).json({
        success: false,
        message: "Error fetching package images",
        error: process.env.NODE_ENV === "development" ? err.message : undefined
      });
    }
  };