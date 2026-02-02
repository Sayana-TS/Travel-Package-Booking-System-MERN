import mongoose from "mongoose";

const galleryItemSchema = new mongoose.Schema({
  url: { type: String, required: true },
  thumbnailUrl: { type: String },
  fileName: { type: String },
  fileSize: { type: Number }, // in bytes
  mimeType: { type: String },
  dimensions: {
    width: Number,
    height: Number
  },
  caption: String,
  tags: [String],
  category: { 
    type: String, 
    enum: ["landscape", "activities", "cuisine", "accommodation", "other"],
    required: true 
  },
  isFeatured: { type: Boolean, default: false },
  uploadOrder: { type: Number, default: 0 },
  metadata: {
    uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    uploadedAt: { type: Date, default: Date.now },
    lastModified: Date
  }
}, { timestamps: true });

const gallerySchema = new mongoose.Schema({
  // Reference to what this gallery belongs to (hotel or package)
  entityId: { 
    type: mongoose.Schema.Types.ObjectId, 
    required: true,
    refPath: "entityType"
  },
  entityType: { 
    type: String, 
    enum: ["Hotel", "Package", "Agent"],
    required: true 
  },
  // Agent who owns this gallery
  agent: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Agent", 
    required: true 
  },
  // Main gallery configuration
  title: String,
  description: String,
  coverImage: { type: String }, // URL to cover image
  isPublic: { type: Boolean, default: true },
  
  // Organized images by category
  images: {
    landscape: [galleryItemSchema],
    activities: [galleryItemSchema],
    cuisine: [galleryItemSchema],
    accommodation: [galleryItemSchema],
    other: [galleryItemSchema]
  },
  
  // Statistics
  stats: {
    totalImages: { type: Number, default: 0 },
    lastUpload: Date,
    storageUsed: { type: Number, default: 0 } // in bytes
  }
}, { timestamps: true });

// Update stats before saving
gallerySchema.pre('save', function(next) {
  // Calculate total images
  const totalImages = 
    this.images.landscape.length +
    this.images.activities.length +
    this.images.cuisine.length +
    this.images.accommodation.length +
    this.images.other.length;
  
  this.stats.totalImages = totalImages;
  
  // Update last upload date if there are images
  if (totalImages > 0 && !this.stats.lastUpload) {
    this.stats.lastUpload = new Date();
  }
  
  next();
});

// Index for efficient queries
gallerySchema.index({ agent: 1, entityType: 1, entityId: 1 });
gallerySchema.index({ "images.category": 1 });

const Gallery = mongoose.model("Gallery", gallerySchema);
export default Gallery;