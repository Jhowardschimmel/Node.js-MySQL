DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;
USE bamazon;
CREATE TABLE products(
  item_id INTEGER(20) AUTO_INCREMENT NOT NULL,
  product_name VARCHAR(100) NOT NULL,
  department_name VARCHAR(100) NOT NULL,
  price DECIMAL(20,2) NOT NULL,
  stock_quantity INTEGER(20),
  primary key(item_id)
  );
  
  SELECT * FROM products;
  
  INSERT INTO products (product_name, department_name, price, stock_quantity)
  VALUES ("Magic Beans", "Supernatural Produce", 1000, 2),
  ("Necronomicon", "Forbidden Books", 29.99, 50),
  ("Codex of the Infinite Planes", "Forbidden Books", 3000, 1),
  ("Gurney's Baliset", "Space Instruments", 59.99, 15),
  ("Picard's Flute", "Space Instruments", 39.99, 20),
  ("Cloak of elvenkind", "Wondrous Apparel", 2500, 82),
  ("X-ray Sun Glasses", "Wondrous Apparel", 100, 25),
  ("Gandalf's Pipe", "Pariphernalia", 15.99, 30),
  ("Treasure Map", "Pirating Goods", 199.99, 5),
  ("Cannon Ball", "Pirating Goods", 49.99, 5);