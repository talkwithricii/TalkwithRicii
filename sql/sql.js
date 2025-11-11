// --- YouTube Player Setup ---
let player;
let playerReady = false;

function onYouTubeIframeAPIReady() {
  player = new YT.Player("player", {
    height: "420",
    width: "100%",
    videoId: "",
    playerVars: { rel: 0, modestbranding: 1, playsinline: 1 },
    events: {
      onReady: () => { playerReady = true; },
      onError: (err) => console.warn("YouTube Player Error:", err)
    }
  });
}

function loadVideoSafe(videoId){
  if(playerReady && player && typeof player.loadVideoById==='function'){
    player.loadVideoById(videoId);
  } else { setTimeout(()=>loadVideoSafe(videoId),500);}
}

// --- Course Content Data ---
const contents=[
  {title:"1. Getting Started with MySQL",
   lessons:[
    {name:"Downloading SQL Installer", url:"https://www.youtube.com/embed/im2mocCGRsA", content:{title:"Installing MySQL", paragraph:"Learn to install MySQL.", code:"-- No SQL code\n<a href='#' class='exercise-link'>Installer Exercise</a>"}},
    {name:"Installing MySQL", url:"https://www.youtube.com/embed/KFIQ2gt7rvQ", content:{title:"Connecting", paragraph:"Connect using Workbench or CLI.", code:"-- No SQL code\n<a href='#' class='exercise-link'>Connect Exercise</a>"}}
   ]},

  {title:"2. Lazada-style E-commerce Database",
   lessons:[


{
  "name": "Create Database",
  "url": "https://www.youtube.com/embed/SmM2XqJH0eE",
  "content": {
    "title": "Database Setup",
    "paragraph": "Create tables and relations for e-commerce. First, use `CREATE DATABASE LazadaRealDB;` to create the database. Then, `USE LazadaRealDB;` to select it and start creating tables and relationships within this database.",
    "code": "CREATE DATABASE LazadaRealDB;\nUSE LazadaRealDB;\n<a href='#' class='exercise-link'>Create Database Exercise</a>"
  }
},


{
  "name": "Users Table",
  "url": "https://www.youtube.com/embed/SmM2XqJH0eE",
  "content": {
    "title": "Users Table Setup",
   "paragraph": "<b>Purpose</b><br>This table stores all users of the e-commerce platform, including customers, sellers, and admins. Each user has a unique ID, full name, email, password, optional phone number, role, and timestamps for account creation and last login.<br><br><b>Important Syntax Notes</b><br>1. <code>INT</code>: Defines a numeric column.<br>2. <code>PRIMARY KEY</code>: Uniquely identifies each row in the table.<br>3. <code>AUTO_INCREMENT</code>: Automatically generates a unique value for each new row.<br>4. <code>VARCHAR(n)</code>: Stores text with a maximum length of n characters.<br>5. <code>UNIQUE</code>: Ensures that values in this column are unique across all rows.<br>6. <code>ENUM('Customer','Seller','Admin')</code>: Restricts the column to only the specified values.<br>7. <code>DATETIME DEFAULT CURRENT_TIMESTAMP</code>: Automatically sets the current date and time when a new row is created.<br>8. <code>last_login DATETIME</code>: Can be updated to track the last login time of the user.<br>9. <code>NOT NULL</code>: Ensures that the column must have a value and cannot be left empty.",
   "code": "CREATE TABLE Users (\n    user_id INT PRIMARY KEY AUTO_INCREMENT,\n    full_name VARCHAR(100) NOT NULL,\n    email VARCHAR(100) UNIQUE NOT NULL,\n    password_hash VARCHAR(255) NOT NULL,\n    phone VARCHAR(20),\n    role ENUM('Customer','Seller','Admin') NOT NULL,\n    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,\n    last_login DATETIME\n);\n<a href='#' class='exercise-link'>Users Table Exercise</a>"
  }
},

{
  "name": "Categories Table",
  "url": "https://www.youtube.com/embed/SmM2XqJH0eE",
  "content": {
    "title": "Categories Table Setup",
    "paragraph": "<b>Purpose</b><br>This table stores product categories for the e-commerce platform, allowing hierarchical categorization with parent and subcategories. Each category has a unique ID, a name, and an optional reference to a parent category.<br><br><b>Important Syntax Notes</b><br>1. <code>DEFAULT NULL</code>: Allows the column to be empty.<br>2. <code>FOREIGN KEY (parent_id)</code>: Defines a reference to another row in the same table.<br>3. <code>REFERENCES Categories(category_id)</code>: Ensures that the parent category exists in the Categories table.",
    "code": "CREATE TABLE Categories (\n    category_id INT PRIMARY KEY AUTO_INCREMENT,\n    category_name VARCHAR(100) NOT NULL,\n    parent_id INT DEFAULT NULL,\n    FOREIGN KEY (parent_id) REFERENCES Categories(category_id)\n);\n<a href='#' class='exercise-link'>Categories Table Exercise</a>"
  }
},

{
  "name": "Categories Table Notes Self-Referencing in SQL",
  "url": "https://www.youtube.com/embed/SmM2XqJH0eE",
  "content": {
    "title": "What is Self-Referencing in SQL?",
    "paragraph": "A self-referencing column is when a table has a foreign key that points to its own primary key.<br><br>In our example:<br><code>CREATE TABLE Categories (\n    category_id INT PRIMARY KEY AUTO_INCREMENT,\n    category_name VARCHAR(100) NOT NULL,\n    parent_id INT DEFAULT NULL,\n    FOREIGN KEY (parent_id) REFERENCES Categories(category_id)\n);</code><br><br>Here, <code>parent_id</code> references <code>category_id</code> in the same table. This allows one row to point to another row in the same table as its parent.<br><br>Think of it like a family tree:<br>- category_id = the child<br>- parent_id = points to the parent<br><br><b>Why is Self-Referencing Important in Business?</b><br>- <b>Hierarchical Structure:</b> Businesses often have categories and subcategories (Electronics → Mobile Phones → Smartphones). Self-referencing models this tree structure efficiently.<br>- <b>Dynamic and Scalable:</b> Adding new categories or subcategories is easy without changing table structure.<br>- <b>Better Data Organization:</b> Helps organize products, departments, or any nested structure in a clear hierarchy.<br>- <b>Supports Queries:</b> Find all products in a category and its subcategories easily. Build menus or filters automatically for websites.<br><br><b>Why it’s Important for Products</b><br>Each product belongs to a category, often nested:<br>Product → Subcategory → Category<br>Example:<br>- Product: iPhone 14<br>- Category: Smartphones → Mobile Phones → Electronics<br>Self-referencing allows you to trace the product up the category tree. Useful for search, filtering, and recommendation systems.<br><br><b>Parent ID Explanation</b><br><b>Why parent_id = NULL for top-level categories:</b><br>- parent_id points to the parent category.<br>- Top-level categories don’t have a parent, so we set parent_id = NULL.<br><br>Example:<br><table border='1'><tr><th>category_name</th><th>category_id</th><th>parent_id</th></tr><tr><td>Electronics</td><td>1</td><td>NULL</td></tr><tr><td>Mens Clothing</td><td>8</td><td>NULL</td></tr></table><br>Electronics and Mens Clothing are at the top level, so they have no parent → parent_id = NULL.<br><br><b>How parent_id works for subcategories:</b><br>A subcategory’s parent_id points to its immediate parent’s category_id.<br><br>Example:<br><table border='1'><tr><th>category_name</th><th>category_id</th><th>parent_id</th></tr><tr><td>Mobile Phones</td><td>2</td><td>1</td></tr><tr><td>Android</td><td>3</td><td>2</td></tr><tr><td>iOS</td><td>4</td><td>2</td></tr><tr><td>Laptops</td><td>5</td><td>1</td></tr><tr><td>ASUS</td><td>6</td><td>5</td></tr><tr><td>Acer</td><td>7</td><td>5</td></tr><tr><td>Shorts</td><td>9</td><td>8</td></tr></table><br>- Mobile Phones → parent is Electronics → parent_id = 1<br>- Android → parent is Mobile Phones → parent_id = 2<br>- ASUS → parent is Laptops → parent_id = 5<br><br>✅ Rule: Every subcategory points to its immediate parent.<br>✅ Rule: Top-level categories always have parent_id = NULL.",
    "code": "CREATE TABLE Categories (\n    category_id INT PRIMARY KEY AUTO_INCREMENT,\n    category_name VARCHAR(100) NOT NULL,\n    parent_id INT DEFAULT NULL,\n    FOREIGN KEY (parent_id) REFERENCES Categories(category_id)\n);\n<a href='#' class='exercise-link'>Categories Table Exercise</a>"
  }
},

{
  "name": "Products Table",
  "url": "https://www.youtube.com/embed/SmM2XqJH0eE",
  "content": {
    "title": "Products Table Setup",
    "paragraph": "<b>Purpose</b><br>This table stores all products listed on the e-commerce platform. Each product has a unique ID, references to the seller and category, a name, description, price, and timestamps for creation and updates.<br><br><b>Important Syntax Notes</b><br>1. <code>TEXT</code>: Stores long text, such as product descriptions.<br>2. <code>DECIMAL(10,2)</code>: Stores numeric values with 2 decimal places, ideal for prices.<br>3. <code>DATETIME DEFAULT CURRENT_TIMESTAMP</code>: Automatically sets the current date and time when a new row is created.",
    "code": "CREATE TABLE Products (\n    product_id INT PRIMARY KEY AUTO_INCREMENT,\n    seller_id INT NOT NULL,\n    category_id INT NOT NULL,\n    product_name VARCHAR(150),\n    description TEXT,\n    price DECIMAL(10,2),\n    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,\n    updated_at DATETIME,\n    FOREIGN KEY (seller_id) REFERENCES Users(user_id),\n    FOREIGN KEY (category_id) REFERENCES Categories(category_id)\n);\n<a href='#' class='exercise-link'>Products Table Exercise</a>"
  }
},

{
  "name": "ProductVariants Table",
  "url": "https://www.youtube.com/embed/SmM2XqJH0eE",
  "content": {
    "title": "ProductVariants Table Setup",
    "paragraph": "<b>Purpose</b><br>This table stores all variants of products, such as different colors or sizes. Each variant has a unique ID, references a product, has a SKU, optional color and size, stock quantity, and price.<br><br><b>Important Syntax Notes</b><br>1. <code>DECIMAL(10,2)</code>: Stores numeric values with 2 decimal places, ideal for prices.<br>2. <code>INT DEFAULT 0</code>: Sets a default value of 0 for stock if not provided.<br>3. <code>FOREIGN KEY (product_id) REFERENCES Products(product_id)</code>: Ensures that the variant is linked to a valid product.",
    "code": "CREATE TABLE ProductVariants (\n    variant_id INT PRIMARY KEY AUTO_INCREMENT,\n    product_id INT NOT NULL,\n    sku VARCHAR(50) UNIQUE NOT NULL,\n    color VARCHAR(50),\n    size VARCHAR(50),\n    stock INT DEFAULT 0,\n    price DECIMAL(10,2),\n    FOREIGN KEY (product_id) REFERENCES Products(product_id)\n);\n<a href='#' class='exercise-link'>ProductVariants Table Exercise</a>"
  }
},

{
  "name": "Orders Table",
  "url": "https://www.youtube.com/embed/SmM2XqJH0eE",
  "content": {
    "title": "Orders Table Setup",
    "paragraph": "<b>Purpose</b><br>This table stores all orders placed by customers. Each order has a unique ID, references a customer, records the order date, current status, and shipping address.<br><br><b>Important Syntax Notes</b><br>1. <code>ENUM('Pending','Paid','Shipped','Delivered','Cancelled')</code>: Restricts the column to only the specified order statuses.<br>2. <code>DEFAULT</code>: Sets a default value for the column if none is provided, e.g., the default order status is 'Pending'.",
    "code": "CREATE TABLE Orders (\n    order_id INT PRIMARY KEY AUTO_INCREMENT,\n    customer_id INT NOT NULL,\n    order_date DATETIME DEFAULT CURRENT_TIMESTAMP,\n    status ENUM('Pending','Paid','Shipped','Delivered','Cancelled') DEFAULT 'Pending',\n    shipping_address VARCHAR(255),\n    FOREIGN KEY (customer_id) REFERENCES Users(user_id)\n);\n<a href='#' class='exercise-link'>Orders Table Exercise</a>"
  }
},

{
  "name": "OrderItems Table",
  "url": "https://www.youtube.com/embed/SmM2XqJH0eE",
  "content": {
    "title": "OrderItems Table Setup",
    "paragraph": "<b>Purpose</b><br>This table stores all items included in each order. Each item references an order and a product variant, records the quantity purchased, and the price at the time of the order.<br><br><b>Important Syntax Notes</b><br>1. <code>DECIMAL(10,2)</code>: Stores numeric values with 2 decimal places, ideal for prices.<br>2. <code>FOREIGN KEY</code>: Ensures that the referenced order and variant exist in their respective tables.",
    "code": "CREATE TABLE OrderItems (\n    order_item_id INT PRIMARY KEY AUTO_INCREMENT,\n    order_id INT NOT NULL,\n    variant_id INT NOT NULL,\n    quantity INT NOT NULL,\n    price DECIMAL(10,2),\n    FOREIGN KEY (order_id) REFERENCES Orders(order_id),\n    FOREIGN KEY (variant_id) REFERENCES ProductVariants(variant_id)\n);\n<a href='#' class='exercise-link'>OrderItems Table Exercise</a>"
  }
}, 

{
  "name": "Payment Table",
  "url": "https://www.youtube.com/embed/SmM2XqJH0eE",
  "content": {
    "title": "Payment Table Setup",
    "paragraph": "<b>Purpose</b><br>This table stores all payment transactions for orders. Each payment references an order, records the payment method, amount, status, and the date of the transaction.<br><br><b>Important Syntax Notes</b><br>1. <code>ENUM</code>: Restricts the column to only the specified values, such as payment methods or payment status.<br>2. <code>DECIMAL(10,2)</code>: Stores numeric values with 2 decimal places, ideal for payment amounts.<br>3. <code>DATETIME DEFAULT CURRENT_TIMESTAMP</code>: Automatically sets the current date and time when a new row is created.",
    "code": "CREATE TABLE Payment (\n    payment_id INT PRIMARY KEY AUTO_INCREMENT,\n    order_id INT NOT NULL,\n    payment_method ENUM('Credit Card','GCash','PayPal','COD') NOT NULL,\n    amount DECIMAL(10,2),\n    status ENUM('Pending','Completed','Failed') DEFAULT 'Pending',\n    payment_date DATETIME DEFAULT CURRENT_TIMESTAMP,\n    FOREIGN KEY (order_id) REFERENCES Orders(order_id)\n);\n<a href='#' class='exercise-link'>Payment Table Exercise</a>"
  }
},

{
  "name": "Couriers Table",
  "url": "https://www.youtube.com/embed/SmM2XqJH0eE",
  "content": {
    "title": "Couriers Table Setup",
    "paragraph": "<b>Purpose</b><br>This table stores information about delivery couriers used in the e-commerce platform. Each courier has a unique ID and a name.<br><br><b>Important Syntax Notes</b><br>1. <code>VARCHAR(n)</code>: Stores text with a maximum length of n characters.",
    "code": "CREATE TABLE Couriers (\n    courier_id INT PRIMARY KEY AUTO_INCREMENT,\n    courier_name VARCHAR(100)\n);\n<a href='#' class='exercise-link'>Couriers Table Exercise</a>"
  }
},

{
  "name": "Shipments Table",
  "url": "https://www.youtube.com/embed/SmM2XqJH0eE",
  "content": {
    "title": "Shipments Table Setup",
    "paragraph": "<b>Purpose</b><br>This table stores shipment details for orders. Each shipment references an order and a courier, includes a tracking number, shipped and delivered dates, and tracks the shipment status.<br><br><b>Important Syntax Notes</b><br>1. <code>ENUM</code>: Restricts the column to only the specified shipment statuses.<br>2. <code>DATETIME</code>: Stores date and time values, such as shipped and delivered dates.<br>3. <code>FOREIGN KEY</code>: Ensures that the referenced order and courier exist in their respective tables.",
    "code": "CREATE TABLE Shipments (\n    shipment_id INT PRIMARY KEY AUTO_INCREMENT,\n    order_id INT NOT NULL,\n    courier_id INT NOT NULL,\n    tracking_number VARCHAR(100),\n    shipped_date DATETIME,\n    delivered_date DATETIME,\n    status ENUM('Preparing','Shipped','In Transit','Delivered','Returned') DEFAULT 'Preparing',\n    FOREIGN KEY (order_id) REFERENCES Orders(order_id),\n    FOREIGN KEY (courier_id) REFERENCES Couriers(courier_id)\n);\n<a href='#' class='exercise-link'>Shipments Table Exercise</a>"
  }
},

{
  "name": "ProductReviews Table",
  "url": "https://www.youtube.com/embed/SmM2XqJH0eE",
  "content": {
    "title": "ProductReviews Table Setup",
    "paragraph": "<b>Purpose</b><br>This table stores customer reviews for products. Each review references a product and a customer, includes a rating between 1 and 5, optional review text, and the date of the review.<br><br><b>Important Syntax Notes</b><br>1. <code>TEXT</code>: Stores long text, such as review content.<br>2. <code>DATETIME DEFAULT CURRENT_TIMESTAMP</code>: Automatically sets the current date and time when a new review is created.<br>3. <code>CHECK(rating BETWEEN 1 AND 5)</code>: Ensures the rating value is within the allowed range.<br>4. <code>FOREIGN KEY</code>: Ensures that the referenced product and customer exist in their respective tables.",
    "code": "CREATE TABLE ProductReviews (\n    review_id INT PRIMARY KEY AUTO_INCREMENT,\n    product_id INT NOT NULL,\n    customer_id INT NOT NULL,\n    rating INT CHECK(rating BETWEEN 1 AND 5),\n    review_text TEXT,\n    review_date DATETIME DEFAULT CURRENT_TIMESTAMP,\n    FOREIGN KEY (product_id) REFERENCES Products(product_id),\n    FOREIGN KEY (customer_id) REFERENCES Users(user_id)\n);\n<a href='#' class='exercise-link'>ProductReviews Table Exercise</a>"
  }
},

{
  "name": "SellerReviews Table",
  "url": "https://www.youtube.com/embed/SmM2XqJH0eE",
  "content": {
    "title": "SellerReviews Table Setup",
    "paragraph": "<b>Purpose</b><br>This table stores customer reviews for sellers. Each review references a seller and a customer, includes a rating between 1 and 5, optional review text, and the date of the review.<br><br><b>Important Syntax Notes</b><br>1. <code>TEXT</code>: Stores long text, such as review content.<br>2. <code>DATETIME DEFAULT CURRENT_TIMESTAMP</code>: Automatically sets the current date and time when a new review is created.<br>3. <code>CHECK(rating BETWEEN 1 AND 5)</code>: Ensures the rating value is within the allowed range.<br>4. <code>FOREIGN KEY</code>: Ensures that the referenced seller and customer exist in the Users table.",
    "code": "CREATE TABLE SellerReviews (\n    review_id INT PRIMARY KEY AUTO_INCREMENT,\n    seller_id INT NOT NULL,\n    customer_id INT NOT NULL,\n    rating INT CHECK(rating BETWEEN 1 AND 5),\n    review_text TEXT,\n    review_date DATETIME DEFAULT CURRENT_TIMESTAMP,\n    FOREIGN KEY (seller_id) REFERENCES Users(user_id),\n    FOREIGN KEY (customer_id) REFERENCES Users(user_id)\n);\n<a href='#' class='exercise-link'>SellerReviews Table Exercise</a>"
  }
},

{
  "name": "Cart Table",
  "url": "https://www.youtube.com/embed/SmM2XqJH0eE",
  "content": {
    "title": "Cart Table Setup",
    "paragraph": "<b>Purpose</b><br>This table stores items that customers have added to their shopping cart. Each entry references a customer and a product variant, records the quantity, and the time it was added.<br><br><b>Important Syntax Notes</b><br>1. <code>INT DEFAULT</code>: Sets a default value for numeric columns, e.g., quantity defaults to 1.<br>2. <code>DATETIME DEFAULT CURRENT_TIMESTAMP</code>: Automatically sets the current date and time when a new row is created.<br>3. <code>FOREIGN KEY</code>: Ensures that the referenced customer and product variant exist in their respective tables.",
    "code": "CREATE TABLE Cart (\n    cart_id INT PRIMARY KEY AUTO_INCREMENT,\n    customer_id INT NOT NULL,\n    variant_id INT NOT NULL,\n    quantity INT DEFAULT 1,\n    added_at DATETIME DEFAULT CURRENT_TIMESTAMP,\n    FOREIGN KEY (customer_id) REFERENCES Users(user_id),\n    FOREIGN KEY (variant_id) REFERENCES ProductVariants(variant_id)\n);\n<a href='#' class='exercise-link'>Cart Table Exercise</a>"
  }
},

{
  "name": "Wishlist Table",
  "url": "https://www.youtube.com/embed/SmM2XqJH0eE",
  "content": {
    "title": "Wishlist Table Setup",
    "paragraph": "<b>Purpose</b><br>This table stores products that customers have added to their wishlist. Each entry references a customer and a product, and records the time it was added.<br><br><b>Important Syntax Notes</b><br>1. <code>DATETIME DEFAULT CURRENT_TIMESTAMP</code>: Automatically sets the current date and time when a new row is created.<br>2. <code>FOREIGN KEY</code>: Ensures that the referenced customer and product exist in their respective tables.",
    "code": "CREATE TABLE Wishlist (\n    wishlist_id INT PRIMARY KEY AUTO_INCREMENT,\n    customer_id INT NOT NULL,\n    product_id INT NOT NULL,\n    added_at DATETIME DEFAULT CURRENT_TIMESTAMP,\n    FOREIGN KEY (customer_id) REFERENCES Users(user_id),\n    FOREIGN KEY (product_id) REFERENCES Products(product_id)\n);\n<a href='#' class='exercise-link'>Wishlist Table Exercise</a>"
  }
},

{
  "name": "Coupons Table",
  "url": "https://www.youtube.com/embed/SmM2XqJH0eE",
  "content": {
    "title": "Coupons Table Setup",
    "paragraph": "<b>Purpose</b><br>This table stores coupon codes that can be applied to orders for discounts. Each coupon has a unique code, discount percentage, validity period, and a usage limit.<br><br><b>Important Syntax Notes</b><br>1. <code>VARCHAR(n)</code>: Stores text with a maximum length of n characters, used for coupon codes.<br>2. <code>DECIMAL(5,2)</code>: Stores numeric values with 2 decimal places, used for discount percentages.<br>3. <code>DATE</code>: Stores date values for coupon validity.<br>4. <code>INT DEFAULT</code>: Sets a default value for numeric columns, e.g., usage limit defaults to 1.",
    "code": "CREATE TABLE Coupons (\n    coupon_id INT PRIMARY KEY AUTO_INCREMENT,\n    code VARCHAR(50) UNIQUE NOT NULL,\n    discount_percent DECIMAL(5,2),\n    valid_from DATE,\n    valid_to DATE,\n    usage_limit INT DEFAULT 1\n);\n<a href='#' class='exercise-link'>Coupons Table Exercise</a>"
  }
},

{
  "name": "CouponUsage Table",
  "url": "https://www.youtube.com/embed/SmM2XqJH0eE",
  "content": {
    "title": "CouponUsage Table Setup",
    "paragraph": "<b>Purpose</b><br>This table tracks the usage of coupons by customers on specific orders. Each record references a coupon, a customer, and an order, and records the time it was used.<br><br><b>Important Syntax Notes</b><br>1. <code>DATETIME DEFAULT CURRENT_TIMESTAMP</code>: Automatically sets the current date and time when a new usage record is created.<br>2. <code>FOREIGN KEY</code>: Ensures that the referenced coupon, customer, and order exist in their respective tables.",
    "code": "CREATE TABLE CouponUsage (\n    usage_id INT PRIMARY KEY AUTO_INCREMENT,\n    coupon_id INT NOT NULL,\n    customer_id INT NOT NULL,\n    order_id INT NOT NULL,\n    used_at DATETIME DEFAULT CURRENT_TIMESTAMP,\n    FOREIGN KEY (coupon_id) REFERENCES Coupons(coupon_id),\n    FOREIGN KEY (customer_id) REFERENCES Users(user_id),\n    FOREIGN KEY (order_id) REFERENCES Orders(order_id)\n);\n<a href='#' class='exercise-link'>CouponUsage Table Exercise</a>"
  }
}


]},



  {title:"Lazada-style E-commerce Database INSERT Statements",
   lessons:[

{
  "name": "Users Table Data - Customers",
  "url": "https://www.youtube.com/embed/SmM2XqJH0eE",
  "content": {
    "title": "Users Table Sample Data",
    "paragraph": "<b>Purpose</b><br>This section provides example records for the Users table to demonstrate how users are stored in the e-commerce platform. Each user has a full name, email, hashed password, optional phone number, and a role.",
    "code": "INSERT INTO Users (full_name, email, password_hash, phone, role)\nVALUES\n('Juan Dela Cruz', 'juan@email.com', 'hashed_pw_1', '09171234567', 'Customer'),\n('Maria Santos', 'maria@email.com', 'hashed_pw_2', '09181234567', 'Customer'),\n('Paolo Reyes', 'paolo@email.com', 'hashed_pw_3', '09191234567', 'Customer');\n<a href='#' class='exercise-link'>Users Table Data Exercise</a>"
  }
},

{
  "name": "Users Table Data - Sellers",
  "url": "https://www.youtube.com/embed/SmM2XqJH0eE",
  "content": {
    "title": "Users Table Sample Data - Sellers",
    "paragraph": "<b>Purpose</b><br>This section provides example records for seller accounts in the Users table. Each seller has a full name, email, hashed password, phone number, and role set as 'Seller'.",
    "code": "INSERT INTO Users (full_name, email, password_hash, phone, role)\nVALUES\n('TechHub PH', 'techhub@email.com', 'hashed_pw_4', '09201234567', 'Seller'),\n('StyleCorner', 'stylecorner@email.com', 'hashed_pw_5', '09211234567', 'Seller');\n<a href='#' class='exercise-link'>Users Table Data Exercise - Sellers</a>"
  }
},

{
  "name": "Users Table Data - Admin",
  "url": "https://www.youtube.com/embed/SmM2XqJH0eE",
  "content": {
    "title": "Users Table Sample Data - Admin",
    "paragraph": "<b>Purpose</b><br>This section provides an example record for an admin account in the Users table. The admin has a full name, email, hashed password, phone number, and role set as 'Admin'.",
    "code": "INSERT INTO Users (full_name, email, password_hash, phone, role)\nVALUES\n('Admin One', 'admin1@email.com', 'hashed_pw_6', '09301234567', 'Admin');\n<a href='#' class='exercise-link'>Users Table Data Exercise - Admin</a>"
  }
}, 

{
  "name": "Categories Table Data",
  "url": "https://www.youtube.com/embed/SmM2XqJH0eE",
  "content": {
    "title": "Categories Table Sample Data",
    "paragraph": "<b>Purpose</b><br>This section provides example records for the Categories table. Each category has a name and an optional parent category, allowing hierarchical organization of products.",
    "code": "INSERT INTO Categories (category_name, parent_id)\nVALUES\n('Electronics', NULL),\n('Fashion', NULL),\n('Home & Living', NULL);\n<a href='#' class='exercise-link'>Categories Table Data Exercise</a>"
  }
},

{
  "name": "Categories Table Data - Subcategories",
  "url": "https://www.youtube.com/embed/SmM2XqJH0eE",
  "content": {
    "title": "Categories Table Sample Data - Subcategories",
    "paragraph": "<b>Purpose</b><br>This section provides example records for sub-categories in the Categories table. Each sub-category references a parent category to create a hierarchical structure for products.",
    "code": "INSERT INTO Categories (category_name, parent_id)\nVALUES\n('Mobile Phones', 1),\n('Laptops', 1),\n('Men Clothing', 2),\n('Women Clothing', 2),\n('Furniture', 3),\n('Kitchen Appliances', 3);\n<a href='#' class='exercise-link'>Categories Table Data Exercise - Subcategories</a>"
  }
},

{
  "name": "Categories Table Data - Sub-subcategories",
  "url": "https://www.youtube.com/embed/SmM2XqJH0eE",
  "content": {
    "title": "Categories Table Sample Data - Sub-subcategories",
    "paragraph": "<b>Purpose</b><br>This section provides example records for sub-sub-categories in the Categories table. Each sub-sub-category references a sub-category as its parent, creating a deeper hierarchical structure for products.",
    "code": "INSERT INTO Categories (category_name, parent_id)\nVALUES\n('Smartphones', 4),\n('Feature Phones', 4),\n('Gaming Laptops', 5),\n('Ultrabooks', 5);\n<a href='#' class='exercise-link'>Categories Table Data Exercise - Sub-subcategories</a>"
  }
},

{
  "name": "Products Table Data - TechHub PH",
  "url": "https://www.youtube.com/embed/SmM2XqJH0eE",
  "content": {
    "title": "Products Table Sample Data - TechHub PH",
    "paragraph": "<b>Purpose</b><br>This section provides example product records specifically for the seller TechHub PH (seller_id = 4). Each product references a category, has a name, description, and price.",
    "code": "INSERT INTO Products (seller_id, category_id, product_name, description, price)\nVALUES\n(4, 7, 'iPhone 15', 'Latest Apple iPhone 15', 69900),\n(4, 9, 'Asus ROG Gaming Laptop', 'High performance gaming laptop', 89999),\n(4, 10, 'Dell XPS Ultrabook', 'Slim ultrabook for professionals', 75999);\n<a href='#' class='exercise-link'>Products Table Data Exercise - TechHub PH</a>"
  }
},

{
  "name": "Products Table Data - StyleCorner",
  "url": "https://www.youtube.com/embed/SmM2XqJH0eE",
  "content": {
    "title": "Products Table Sample Data - StyleCorner",
    "paragraph": "<b>Purpose</b><br>This section provides example product records for the seller StyleCorner (seller_id = 5). Each product references a category, has a name, description, and price.",
    "code": "INSERT INTO Products (seller_id, category_id, product_name, description, price)\nVALUES\n(5, 6, 'Men Cotton T-Shirt', 'Soft and comfortable', 499),\n(5, 7, 'Women Summer Dress', 'Light and colorful', 899);\n<a href='#' class='exercise-link'>Products Table Data Exercise - StyleCorner</a>"
  }
},

{
  "name": "ProductVariants Table Data - iPhone 15",
  "url": "https://www.youtube.com/embed/SmM2XqJH0eE",
  "content": {
    "title": "ProductVariants Table Sample Data - iPhone 15",
    "paragraph": "<b>Purpose</b><br>This section provides example variants for the iPhone 15 product. Each variant has a unique SKU, color, size (storage), stock quantity, and price.",
    "code": "INSERT INTO ProductVariants (product_id, sku, color, size, stock, price)\nVALUES\n(1, 'IP15-BLK-128', 'Black', '128GB', 50, 69900),\n(1, 'IP15-WHT-256', 'White', '256GB', 30, 75900);\n<a href='#' class='exercise-link'>ProductVariants Table Data Exercise - iPhone 15</a>"
  }
},

{
  "name": "ProductVariants Table Data - Asus ROG",
  "url": "https://www.youtube.com/embed/SmM2XqJH0eE",
  "content": {
    "title": "ProductVariants Table Sample Data - Asus ROG",
    "paragraph": "<b>Purpose</b><br>This section provides example variants for the Asus ROG Gaming Laptop product. Each variant has a unique SKU, color, size (RAM), stock quantity, and price.",
    "code": "INSERT INTO ProductVariants (product_id, sku, color, size, stock, price)\nVALUES\n(2, 'ASUS-ROG-16GB', 'Black', '16GB RAM', 20, 89999);\n<a href='#' class='exercise-link'>ProductVariants Table Data Exercise - Asus ROG</a>"
  }
},

{
  "name": "ProductVariants Table Data - Dell XPS",
  "url": "https://www.youtube.com/embed/SmM2XqJH0eE",
  "content": {
    "title": "ProductVariants Table Sample Data - Dell XPS",
    "paragraph": "<b>Purpose</b><br>This section provides example variants for the Dell XPS Ultrabook product. Each variant has a unique SKU, color, size (RAM), stock quantity, and price.",
    "code": "INSERT INTO ProductVariants (product_id, sku, color, size, stock, price)\nVALUES\n(3, 'DELL-XPS-8GB', 'Silver', '8GB RAM', 25, 75999);\n<a href='#' class='exercise-link'>ProductVariants Table Data Exercise - Dell XPS</a>"
  }
},

{
  "name": "ProductVariants Table Data - Men Cotton T-Shirt",
  "url": "https://www.youtube.com/embed/SmM2XqJH0eE",
  "content": {
    "title": "ProductVariants Table Sample Data - Men Cotton T-Shirt",
    "paragraph": "<b>Purpose</b><br>This section provides example variants for the Men Cotton T-Shirt product. Each variant has a unique SKU, color, size, stock quantity, and price.",
    "code": "INSERT INTO ProductVariants (product_id, sku, color, size, stock, price)\nVALUES\n(4, 'TSHIRT-M-BLK', 'Black', 'M', 100, 499),\n(4, 'TSHIRT-L-BLU', 'Blue', 'L', 80, 499);\n<a href='#' class='exercise-link'>ProductVariants Table Data Exercise - Men Cotton T-Shirt</a>"
  }
},

{
  "name": "ProductVariants Table Data - Women Summer Dress",
  "url": "https://www.youtube.com/embed/SmM2XqJH0eE",
  "content": {
    "title": "ProductVariants Table Sample Data - Women Summer Dress",
    "paragraph": "<b>Purpose</b><br>This section provides example variants for the Women Summer Dress product. Each variant has a unique SKU, color, size, stock quantity, and price.",
    "code": "INSERT INTO ProductVariants (product_id, sku, color, size, stock, price)\nVALUES\n(5, 'DRESS-S-RED', 'Red', 'S', 40, 899),\n(5, 'DRESS-M-YEL', 'Yellow', 'M', 35, 899);\n<a href='#' class='exercise-link'>ProductVariants Table Data Exercise - Women Summer Dress</a>"
  }
},

{
  "name": "Orders Table Data",
  "url": "https://www.youtube.com/embed/SmM2XqJH0eE",
  "content": {
    "title": "Orders Table Sample Data",
    "paragraph": "<b>Purpose</b><br>This section provides example orders placed by customers. Each order references a customer, has a status, and a shipping address.",
    "code": "INSERT INTO Orders (customer_id, status, shipping_address)\nVALUES\n(1, 'Pending', '123 Manila St, Manila'),\n(2, 'Shipped', '456 Cebu St, Cebu'),\n(3, 'Delivered', '789 Davao St, Davao');\n<a href='#' class='exercise-link'>Orders Table Data Exercise</a>"
  }
},

{
  "name": "OrderItems Table Data",
  "url": "https://www.youtube.com/embed/SmM2XqJH0eE",
  "content": {
    "title": "OrderItems Table Sample Data",
    "paragraph": "<b>Purpose</b><br>This section provides example items included in customer orders. Each order item references an order and a product variant, with a specified quantity and price.",
    "code": "INSERT INTO OrderItems (order_id, variant_id, quantity, price)\nVALUES\n(1, 1, 1, 69900),  -- Juan orders iPhone 15 Black 128GB\n(1, 6, 2, 499),    -- Juan orders 2 Men T-shirts\n(2, 2, 1, 75900),  -- Maria orders iPhone 15 White 256GB\n(3, 3, 1, 89999);  -- Paolo orders Asus ROG Laptop\n<a href='#' class='exercise-link'>OrderItems Table Data Exercise</a>"
  }
},

{
  "name": "Payment Table Data",
  "url": "https://www.youtube.com/embed/SmM2XqJH0eE",
  "content": {
    "title": "Payment Table Sample Data",
    "paragraph": "<b>Purpose</b><br>This section provides example payment records for customer orders. Each payment references an order, has a payment method, amount, and status.",
    "code": "INSERT INTO Payment (order_id, payment_method, amount, status)\nVALUES\n(1, 'GCash', 70898, 'Pending'),\n(2, 'Credit Card', 75900, 'Completed'),\n(3, 'PayPal', 89999, 'Completed');\n<a href='#' class='exercise-link'>Payment Table Data Exercise</a>"
  }
},

{
  "name": "Couriers Table Data",
  "url": "https://www.youtube.com/embed/SmM2XqJH0eE",
  "content": {
    "title": "Couriers Table Sample Data",
    "paragraph": "<b>Purpose</b><br>This section provides example courier companies used for shipments. Each courier has a unique name.",
    "code": "INSERT INTO Couriers (courier_name)\nVALUES ('LBC Express'), ('J&T Express'), ('Grab Express');\n<a href='#' class='exercise-link'>Couriers Table Data Exercise</a>"
  }
},

{
  "name": "Shipments Table Data",
  "url": "https://www.youtube.com/embed/SmM2XqJH0eE",
  "content": {
    "title": "Shipments Table Sample Data",
    "paragraph": "<b>Purpose</b><br>This section provides example shipment records for customer orders. Each shipment references an order and a courier, includes a tracking number, shipped date, and status.",
    "code": "INSERT INTO Shipments (order_id, courier_id, tracking_number, shipped_date, status)\nVALUES\n(1, 1, 'LBC123456', NULL, 'Preparing'),\n(2, 2, 'JNT654321', '2025-11-09 10:00:00', 'Shipped'),\n(3, 3, 'GRB987654', '2025-11-05 15:00:00', 'Delivered');\n<a href='#' class='exercise-link'>Shipments Table Data Exercise</a>"
  }
},

{
  "name": "ProductReviews Table Data",
  "url": "https://www.youtube.com/embed/SmM2XqJH0eE",
  "content": {
    "title": "ProductReviews Table Sample Data",
    "paragraph": "<b>Purpose</b><br>This section provides example product reviews from customers. Each review references a product and a customer, includes a rating (1–5), and optional review text.",
    "code": "INSERT INTO ProductReviews (product_id, customer_id, rating, review_text)\nVALUES\n(1, 1, 5, 'Love my new iPhone 15!'),\n(2, 3, 4, 'Great gaming laptop, a bit heavy.'),\n(4, 1, 4, 'Comfortable T-shirt.');\n<a href='#' class='exercise-link'>ProductReviews Table Data Exercise</a>"
  }
},

{
  "name": "SellerReviews Table Data",
  "url": "https://www.youtube.com/embed/SmM2XqJH0eE",
  "content": {
    "title": "SellerReviews Table Sample Data",
    "paragraph": "<b>Purpose</b><br>This section provides example seller reviews from customers. Each review references a seller and a customer, includes a rating (1–5), and optional review text.",
    "code": "INSERT INTO SellerReviews (seller_id, customer_id, rating, review_text)\nVALUES\n(4, 3, 5, 'Fast shipping and reliable seller.'),\n(5, 1, 4, 'Good quality clothing.');\n<a href='#' class='exercise-link'>SellerReviews Table Data Exercise</a>"
  }
},

{
  "name": "Cart Table Data",
  "url": "https://www.youtube.com/embed/SmM2XqJH0eE",
  "content": {
    "title": "Cart Table Sample Data",
    "paragraph": "<b>Purpose</b><br>This section provides example records of items added to customers' carts. Each cart item references a customer and a product variant, along with the desired quantity.",
    "code": "INSERT INTO Cart (customer_id, variant_id, quantity)\nVALUES\n(1, 2, 1),  -- Juan wants iPhone 15 White 256GB in cart\n(2, 5, 2);  -- Maria wants 2 Men T-shirts in cart\n<a href='#' class='exercise-link'>Cart Table Data Exercise</a>"
  }
},

{
  "name": "Wishlist Table Data",
  "url": "https://www.youtube.com/embed/SmM2XqJH0eE",
  "content": {
    "title": "Wishlist Table Sample Data",
    "paragraph": "<b>Purpose</b><br>This section provides example records of products added to customers' wishlists. Each wishlist item references a customer and a product.",
    "code": "INSERT INTO Wishlist (customer_id, product_id)\nVALUES\n(1, 5),  -- Juan adds Women Summer Dress\n(2, 3);  -- Maria adds Dell XPS Ultrabook\n<a href='#' class='exercise-link'>Wishlist Table Data Exercise</a>"
  }
},

{
  "name": "Coupons Table Data",
  "url": "https://www.youtube.com/embed/SmM2XqJH0eE",
  "content": {
    "title": "Coupons Table Sample Data",
    "paragraph": "<b>Purpose</b><br>This section provides example coupon records for discounts. Each coupon has a unique code, discount percentage, validity period, and a usage limit.",
    "code": "INSERT INTO Coupons (code, discount_percent, valid_from, valid_to, usage_limit)\nVALUES\n('WELCOME10', 10, '2025-11-01', '2025-12-31', 1),\n('TECH20', 20, '2025-11-01', '2025-12-31', 5);\n<a href='#' class='exercise-link'>Coupons Table Data Exercise</a>"
  }
},

{
  "name": "CouponUsage Table Data",
  "url": "https://www.youtube.com/embed/SmM2XqJH0eE",
  "content": {
    "title": "CouponUsage Table Sample Data",
    "paragraph": "<b>Purpose</b><br>This section provides example records of coupon usage. Each usage references a coupon, a customer who used it, and the order where it was applied.",
    "code": "INSERT INTO CouponUsage (coupon_id, customer_id, order_id)\nVALUES\n(1, 1, 1);\n<a href='#' class='exercise-link'>CouponUsage Table Data Exercise</a>"
  }
}

]},

{title:"SELECT Lazada-style E-commerce Database Records",
   lessons:[
    
{
  "name": "Basic SELECT: Get All Columns",
  "url": "https://www.youtube.com/embed/SmM2XqJH0eE",
  "content": {
    "title": "Basic SELECT: Get All Columns",
    "paragraph": "<b>Problem Statement</b><br>The management wants to view all product variants in the system, including SKU, color, size, stock, price, and associated product ID. Write a SQL query to retrieve all rows and columns from the <code>ProductVariants</code> table.<br><br><b>Example Output:</b><br><table border='1'><tr><th>variant_id</th><th>product_id</th><th>sku</th><th>color</th><th>size</th><th>stock</th><th>price</th></tr><tr><td>1</td><td>1</td><td>IP15-BLK-128</td><td>Black</td><td>128GB</td><td>50</td><td>69900</td></tr><tr><td>2</td><td>1</td><td>IP15-WHT-256</td><td>White</td><td>256GB</td><td>30</td><td>75900</td></tr></table><br><b>Important Syntax</b><br>SELECT * FROM table_name; — Retrieves all columns and all rows from the specified table.",
    "code": "SELECT * FROM ProductVariants;\n<a href='#' class='exercise-link'>Quiz 2 Exercise</a>"
  }
},

{
  "name": "Select Specific Columns",
  "url": "https://www.youtube.com/embed/SmM2XqJH0eE",
  "content": {
    "title": "Select Specific Columns",
    "paragraph": "<b>Problem Statement</b><br>The inventory team wants to see only the key details of product variants for stock management: SKU, color, size, stock, and price. Write a SQL query to retrieve only these columns from the <code>ProductVariants</code> table.<br><br><b>Example Output:</b><br><table border='1'><tr><th>sku</th><th>color</th><th>size</th><th>stock</th><th>price</th></tr><tr><td>IP15-BLK-128</td><td>Black</td><td>128GB</td><td>50</td><td>69900</td></tr><tr><td>IP15-WHT-256</td><td>White</td><td>256GB</td><td>30</td><td>75900</td></tr></table><br><b>Important Syntax</b><br>SELECT column1, column2, ... FROM table_name; — Retrieves only the specified columns.",
    "code": "SELECT sku, color, size, stock, price FROM ProductVariants;\n<a href='#' class='exercise-link'>Quiz 3 Exercise</a>"
  }
},

{
  "name": "SELECT with WHERE (Filtering)",
  "url": "https://www.youtube.com/embed/SmM2XqJH0eE",
  "content": {
    "title": "SELECT with WHERE (Filtering)",
    "paragraph": "<b>Problem Statement</b><br>The inventory team wants to identify product variants that are running low on stock (less than 50 units) so they can restock in time. Write a SQL query to retrieve the SKU and current stock of these low-stock variants.<br><br><b>Example Output:</b><br><table border='1'><tr><th>sku</th><th>stock</th></tr><tr><td>IP15-WHT-256</td><td>30</td></tr><tr><td>DRESS-M-YEL</td><td>35</td></tr></table><br><b>Important Syntax</b><br>SELECT column1, column2 FROM table_name WHERE condition; — Filters rows based on a condition.",
    "code": "SELECT sku, stock FROM ProductVariants\nWHERE stock < 50;\n<a href='#' class='exercise-link'>Quiz 4 Exercise</a>"
  }
},

{
  "name": "SELECT with ORDER BY (Sorting)",
  "url": "https://www.youtube.com/embed/SmM2XqJH0eE",
  "content": {
    "title": "SELECT with ORDER BY (Sorting)",
    "paragraph": "<b>Problem Statement</b><br>The sales team wants to see the product variants sorted by price from highest to lowest, so they can focus on premium products first. Write a SQL query to retrieve the SKU and price of all product variants sorted by price in descending order.<br><br><b>Example Output:</b><br><table border='1'><tr><th>sku</th><th>price</th></tr><tr><td>ASUS-ROG-16GB</td><td>89999</td></tr><tr><td>DELL-XPS-8GB</td><td>75999</td></tr><tr><td>IP15-WHT-256</td><td>75900</td></tr><tr><td>IP15-BLK-128</td><td>69900</td></tr><tr><td>DRESS-M-YEL</td><td>899</td></tr><tr><td>TSHIRT-M-BLK</td><td>499</td></tr></table><br><b>Important Syntax</b><br>SELECT column1, column2 FROM table_name ORDER BY column_name ASC|DESC; — Sorts results by the specified column in ascending (ASC) or descending (DESC) order.",
    "code": "SELECT sku, price FROM ProductVariants\nORDER BY price DESC;\n<a href='#' class='exercise-link'>Quiz 5 Exercise</a>"
  }
},

{
  "name": "SELECT with LIMIT / TOP (First N Rows)",
  "url": "https://www.youtube.com/embed/SmM2XqJH0eE",
  "content": {
    "title": "SELECT with LIMIT / TOP (First N Rows)",
    "paragraph": "<b>Problem Statement</b><br>The sales dashboard needs to display the top 3 most expensive product variants so that management can monitor premium products. Write a SQL query to retrieve the SKU and price of the top 3 variants sorted by price descending.<br><br><b>Example Output:</b><br><table border='1'><tr><th>sku</th><th>price</th></tr><tr><td>ASUS-ROG-16GB</td><td>89999</td></tr><tr><td>DELL-XPS-8GB</td><td>75999</td></tr><tr><td>IP15-WHT-256</td><td>75900</td></tr></table><br><b>Important Syntax</b><br>SELECT column1, column2 FROM table_name ORDER BY column_name DESC LIMIT n; — Shows only the first n rows of the result set.",
    "code": "SELECT sku, price FROM ProductVariants\nORDER BY price DESC\nLIMIT 3;\n<a href='#' class='exercise-link'>Quiz 6 Exercise</a>"
  }
},

{
  "name": "SELECT with DISTINCT (Unique Values)",
  "url": "https://www.youtube.com/embed/SmM2XqJH0eE",
  "content": {
    "title": "SELECT with DISTINCT (Unique Values)",
    "paragraph": "<b>Problem Statement</b><br>The inventory manager wants to see all the unique colors available across all product variants to plan packaging and marketing. Write a SQL query to retrieve all distinct colors from the <code>ProductVariants</code> table.<br><br><b>Example Output:</b><br><table border='1'><tr><th>color</th></tr><tr><td>Black</td></tr><tr><td>White</td></tr><tr><td>Silver</td></tr><tr><td>Blue</td></tr><tr><td>Red</td></tr><tr><td>Yellow</td></tr></table><br><b>Important Syntax</b><br>SELECT DISTINCT column_name FROM table_name; — Returns only unique values for the specified column.",
    "code": "SELECT DISTINCT color FROM ProductVariants;\n<a href='#' class='exercise-link'>Quiz 7 Exercise</a>"
  }
},

{
  "name": "SELECT with JOIN (Combine Tables)",
  "url": "https://www.youtube.com/embed/SmM2XqJH0eE",
  "content": {
    "title": "SELECT with JOIN (Combine Tables)",
    "paragraph": "<b>Purpose</b><br>Combine data from multiple tables to get detailed information about products and their variants, which is useful for inventory tracking and reporting.<br><br><b>Problem Statement</b><br>The management wants a complete view of all products along with their variant details including SKU, color, size, and stock. Write a SQL query to combine data from the <code>Products</code> and <code>ProductVariants</code> tables.<br><br><b>Example Output:</b><br><table border='1'><tr><th>product_name</th><th>sku</th><th>color</th><th>size</th><th>stock</th></tr><tr><td>iPhone 15</td><td>IP15-BLK-128</td><td>Black</td><td>128GB</td><td>50</td></tr><tr><td>iPhone 15</td><td>IP15-WHT-256</td><td>White</td><td>256GB</td><td>30</td></tr><tr><td>Asus ROG Gaming Laptop</td><td>ASUS-ROG-16GB</td><td>Black</td><td>16GB RAM</td><td>20</td></tr><tr><td>Dell XPS Ultrabook</td><td>DELL-XPS-8GB</td><td>Silver</td><td>8GB RAM</td><td>25</td></tr><tr><td>Men Cotton T-Shirt</td><td>TSHIRT-M-BLK</td><td>Black</td><td>M</td><td>100</td></tr><tr><td>Men Cotton T-Shirt</td><td>TSHIRT-L-BLU</td><td>Blue</td><td>L</td><td>80</td></tr></table><br><b>Important Syntax</b><br>SELECT columns FROM table1 JOIN table2 ON table1.column = table2.column; — Combines rows from two tables based on a related column.",
    "code": "SELECT p.product_name, pv.sku, pv.color, pv.size, pv.stock\nFROM Products p\nJOIN ProductVariants pv ON p.product_id = pv.product_id;\n<a href='#' class='exercise-link'>Quiz 8 Exercise</a>"
  }
},

{
  "name": "SELECT with Aggregate Functions (SUM, COUNT, AVG)",
  "url": "https://www.youtube.com/embed/SmM2XqJH0eE",
  "content": {
    "title": "SELECT with Aggregate Functions (SUM, COUNT, AVG)",
    "paragraph": "<b>Purpose</b><br>Get totals, averages, counts, minimum or maximum values for analysis, useful for inventory management and reporting.<br><br><b>Problem Statement</b><br>The inventory team wants to know: <br>1. The total stock available for each product.<br>2. The number of variants available for each product.<br>Write SQL queries using aggregate functions to get these insights.<br><br><b>Example Output:</b><br><b>Total stock per product:</b><br><table border='1'><tr><th>product_name</th><th>total_stock</th></tr><tr><td>iPhone 15</td><td>80</td></tr><tr><td>Asus ROG Gaming Laptop</td><td>20</td></tr><tr><td>Dell XPS Ultrabook</td><td>25</td></tr><tr><td>Men Cotton T-Shirt</td><td>180</td></tr><tr><td>Women Summer Dress</td><td>75</td></tr></table><br><b>Number of variants per product:</b><br><table border='1'><tr><th>product_name</th><th>variant_count</th></tr><tr><td>iPhone 15</td><td>2</td></tr><tr><td>Asus ROG Gaming Laptop</td><td>1</td></tr><tr><td>Dell XPS Ultrabook</td><td>1</td></tr><tr><td>Men Cotton T-Shirt</td><td>2</td></tr><tr><td>Women Summer Dress</td><td>2</td></tr></table><br><b>Important Syntax</b><br>SUM(column) — Total sum of values.<br>COUNT(column) — Number of rows.<br>AVG(column) — Average value.<br>GROUP BY column — Groups rows for aggregation.",
    "code": "-- Total stock for each product\nSELECT p.product_name, SUM(pv.stock) AS total_stock\nFROM Products p\nJOIN ProductVariants pv ON p.product_id = pv.product_id\nGROUP BY p.product_name;\n\n-- Number of variants per product\nSELECT p.product_name, COUNT(pv.variant_id) AS variant_count\nFROM Products p\nJOIN ProductVariants pv ON p.product_id = pv.product_id\nGROUP BY p.product_name;\n<a href='#' class='exercise-link'>Quiz 9 Exercise</a>"
  }
},

{
  "name": "SELECT with HAVING (Filter on Aggregates)",
  "url": "https://www.youtube.com/embed/SmM2XqJH0eE",
  "content": {
    "title": "SELECT with HAVING (Filter on Aggregates)",
    "paragraph": "<b>Purpose</b><br>Filter aggregated results to show only groups that meet certain conditions, useful for reporting high-stock products or performance metrics.<br><br><b>Problem Statement</b><br>The inventory team wants to identify products that have a total stock greater than 50 units across all variants. Write a SQL query to retrieve the product name and total stock for these products.<br><br><b>Example Output:</b><br><table border='1'><tr><th>product_name</th><th>total_stock</th></tr><tr><td>iPhone 15</td><td>80</td></tr><tr><td>Men Cotton T-Shirt</td><td>180</td></tr><tr><td>Women Summer Dress</td><td>75</td></tr></table><br><b>Important Syntax</b><br>SELECT column1, aggregate_function(column2) FROM table1 JOIN table2 ON condition GROUP BY column1 HAVING aggregate_function(column2) condition; — Filters groups based on aggregate values.",
    "code": "-- Products with total stock > 50\nSELECT p.product_name, SUM(pv.stock) AS total_stock\nFROM Products p\nJOIN ProductVariants pv ON p.product_id = pv.product_id\nGROUP BY p.product_name\nHAVING SUM(pv.stock) > 50;\n<a href='#' class='exercise-link'>Quiz 10 Exercise</a>"
  }
},

{
  "name": "SELECT with LIKE (Pattern Matching)",
  "url": "https://www.youtube.com/embed/SmM2XqJH0eE",
  "content": {
    "title": "SELECT with LIKE (Pattern Matching)",
    "paragraph": "<b>Purpose</b><br>Search for text patterns in a table, useful for product searches, filtering, and reporting.<br><br><b>Problem Statement</b><br>The marketing team wants to find all products containing the word 'iPhone' in their name to create a targeted promotion. Write a SQL query using <code>LIKE</code> to retrieve these products.<br><br><b>Example Output:</b><br><table border='1'><tr><th>product_name</th></tr><tr><td>iPhone 15</td></tr></table><br><b>Important Syntax</b><br>SELECT column1 FROM table_name WHERE column1 LIKE 'pattern'; — Use % as a wildcard for any number of characters and _ for a single character.",
    "code": "SELECT product_name FROM Products\nWHERE product_name LIKE '%iPhone%';\n<a href='#' class='exercise-link'>Quiz 11 Exercise</a>"
  }
},

{
  "name": "Quiz 12 — SELECT with BETWEEN",
  "url": "https://www.youtube.com/embed/SmM2XqJH0eE",
  "content": {
    "title": "SELECT with BETWEEN",
    "paragraph": "<b>Purpose</b><br>Filter rows based on a numeric or date range, useful for pricing analysis, promotions, or reporting.<br><br><b>Problem Statement</b><br>The marketing team wants to find all product variants priced between 500 and 1000 PHP to plan a mid-range promotion. Write a SQL query to retrieve the SKU and price of these variants.<br><br><b>Example Output:</b><br><table border='1'><tr><th>sku</th><th>price</th></tr><tr><td>TSHIRT-M-BLK</td><td>499</td></tr><tr><td>TSHIRT-L-BLU</td><td>499</td></tr><tr><td>DRESS-S-RED</td><td>899</td></tr><tr><td>DRESS-M-YEL</td><td>899</td></tr></table><br><b>Important Syntax</b><br>SELECT column1, column2 FROM table_name WHERE column_name BETWEEN value1 AND value2; — Filters rows where the column value is within the specified range.",
    "code": "SELECT sku, price FROM ProductVariants\nWHERE price BETWEEN 500 AND 1000;\n<a href='#' class='exercise-link'>Quiz 12 Exercise</a>"
  }
},

{
  "name": "SELECT with BETWEEN",
  "url": "https://www.youtube.com/embed/SmM2XqJH0eE",
  "content": {
    "title": "SELECT with BETWEEN",
    "paragraph": "<b>Purpose</b><br>Filter rows based on a numeric or date range, useful for pricing analysis, promotions, or reporting.<br><br><b>Problem Statement</b><br>The marketing team wants to find all product variants priced between 500 and 1000 PHP to plan a mid-range promotion. Write a SQL query to retrieve the SKU and price of these variants.<br><br><b>Example Output:</b><br><table border='1'><tr><th>sku</th><th>price</th></tr><tr><td>TSHIRT-M-BLK</td><td>499</td></tr><tr><td>TSHIRT-L-BLU</td><td>499</td></tr><tr><td>DRESS-S-RED</td><td>899</td></tr><tr><td>DRESS-M-YEL</td><td>899</td></tr></table><br><b>Important Syntax</b><br>SELECT column1, column2 FROM table_name WHERE column_name BETWEEN value1 AND value2; — Filters rows where the column value is within the specified range.",
    "code": "SELECT sku, price FROM ProductVariants\nWHERE price BETWEEN 500 AND 1000;\n<a href='#' class='exercise-link'>Quiz 12 Exercise</a>"
  }
},

{
  "name": "SELECT with IN (Multiple Values)",
  "url": "https://www.youtube.com/embed/SmM2XqJH0eE",
  "content": {
    "title": "SELECT with IN (Multiple Values)",
    "paragraph": "<b>Purpose</b><br>Filter rows based on multiple possible values without writing multiple OR conditions, useful for selecting specific options like colors, categories, or sellers.<br><br><b>Problem Statement</b><br>The marketing team wants to find all product variants that are either Black or White to feature in a monochrome-themed promotion. Write a SQL query to retrieve the SKU and color of these variants.<br><br><b>Example Output:</b><br><table border='1'><tr><th>sku</th><th>color</th></tr><tr><td>IP15-BLK-128</td><td>Black</td></tr><tr><td>IP15-WHT-256</td><td>White</td></tr><tr><td>ASUS-ROG-16GB</td><td>Black</td></tr><tr><td>TSHIRT-M-BLK</td><td>Black</td></tr></table><br><b>Important Syntax</b><br>SELECT column1, column2 FROM table_name WHERE column_name IN (value1, value2, ...); — Filters rows where the column matches any value in the list.",
    "code": "SELECT sku, color FROM ProductVariants\nWHERE color IN ('Black', 'White');\n<a href='#' class='exercise-link'>Quiz 13 Exercise</a>"
  }
}































]},





     {title:"",
   lessons:[
    {name:"", url:"https://www.youtube.com/embed/someID", content:{title:"LEFT JOIN - Include All Left Table", paragraph:"Retrieve all from left table.", code:"SELECT e.name, d.department_name FROM employees AS e LEFT JOIN departments AS d ON e.department_id = d.id;\n<a href='leftjoinpractice/leftjoin-practice.html' class='exercise-link'>LEFT JOIN Practice</a>"}}
   ]}
];

// --- Helper ---
function getVideoId(url){ const match=url.match(/(?:v=|\/)([0-9A-Za-z_-]{11})/); return match?match[1]:null; }

// --- Populate Course Contents ---
const courseContents=document.getElementById("course-contents");
const explanation=document.querySelector(".explanation");

contents.forEach(section=>{
  const div=document.createElement("div");
  div.classList.add("contents-section");

  const button=document.createElement("button");
  button.classList.add("toggle-btn");
  button.textContent=section.title;

  const list=document.createElement("ul");
  list.classList.add("lesson-list");

  section.lessons.forEach(lesson=>{
    const li=document.createElement("li");
    const link=document.createElement("a");
    link.href="#"; 
    link.classList.add("lesson-link");
    const span = document.createElement("span");
    span.textContent = lesson.name;
    link.appendChild(span);

    link.addEventListener("click", e=>{
      e.preventDefault();
      const videoId=getVideoId(lesson.url);
      if(videoId) loadVideoSafe(videoId);

      document.querySelectorAll(".lesson-link").forEach(l=>l.classList.remove("lesson-active"));
      link.classList.add("lesson-active");

      if(lesson.content){
        explanation.innerHTML=`
          <h2>${lesson.content.title}</h2>
          <p>${lesson.content.paragraph}</p>
          <h3>Example Query</h3>
          <div class="code-container"><pre>${lesson.content.code}</pre></div>
        `;
      }

      // Smooth scroll to explanation
      explanation.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });

    li.appendChild(link); list.appendChild(li);
  });

  button.addEventListener("click", ()=>{ list.style.display=list.style.display==='block'?'none':'block'; });
  div.appendChild(button); div.appendChild(list);
  courseContents.appendChild(div);
});

// --- Responsive iframe ---
window.addEventListener("resize", ()=>{
  if(player?.getIframe){ const iframe=player.getIframe(); iframe.style.height=window.innerWidth<600?"220px":"420px";}
});
