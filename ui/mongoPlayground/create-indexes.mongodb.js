/* global use, db */
// MongoDB Playground
// Use Ctrl+Space inside a snippet or a string literal to trigger completions.

// The current database to use.
use('aipoppins_mock');
var collection = db.getCollection('mock_data');

collection.createIndex({ name: 1 }, { name: "name_index" });
// Add index on "priority" field
collection.createIndex({ priority: 1 }, { name: "priority_index" });
// Add index on "category" field
collection.createIndex({ category: 1 }, { name: "category_index" });
// Add compound index on "start_date" and "due_date" fields
collection.createIndex({ start_date: 1, due_date: 1 }, { name: "date_range_index" });