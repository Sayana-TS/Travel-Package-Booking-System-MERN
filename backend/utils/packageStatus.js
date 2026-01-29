export const calculatePackageStatus = (pkg) => {
    const today = new Date();
    const start = new Date(pkg.travelDates.start);
    const end = new Date(pkg.travelDates.end);
  
    // Completed always wins
    if (end < today) return "completed";
  
    // Only approved packages can go live
    if (pkg.status !== "approved") return pkg.status;
  
    const diffInDays =
      (start - today) / (1000 * 60 * 60 * 24);
  
    if (diffInDays > 30) return "upcoming";
  
    if (diffInDays <= 30 && end >= today) return "active";
  
    return pkg.status;
  };
  