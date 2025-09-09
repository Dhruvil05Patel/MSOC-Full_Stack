// clear_collections.js

// Switch to your SalonDesk database
use("SalonDesk");

// Drop (remove) the collections completely
db.branches.drop();
db.services.drop();
db.stylists.drop();

print("✅ Collections branches, services, and stylists have been dropped.");
