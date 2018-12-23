const mysql = require("mysql");
const inquirer = require("inquirer");
const cTable = require('console.table');

const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "",
    database: "bamazon"

});
connection.connect((err) => {
    if (err) {
        console.error("error connecting: " + err.stack);
    }
    getProducts();
});

const getProducts = () => {
    connection.query("SELECT * FROM products", (err, res) => {
        if (err) throw err;
    
        
        console.table(res);
    
       
        promptCustomerForItem(res);
      });
}
// Prompt the customer for a product ID
const promptCustomerForItem = (inventory) => {
    // Prompts user for what they would like to purchase
    inquirer
      .prompt([
        {
          type: "input",
          name: "choice",
          message: "Enter ID of the item you want to buy? [Quit with Q]",
          validate: function(val) {
            return !isNaN(val) || val.toLowerCase() === "q";
          }
        }
      ])
      .then(function(val) {
        // Check if the user wants to quit the program
        checkIfShouldExit(val.choice);
        const choiceId = parseInt(val.choice);
        const product = checkInventory(choiceId, inventory);
  
        // If there is a product with the id the user chose, prompt the customer for a desired quantity
        if (product) {
          // Pass the chosen product to promptCustomerForQuantity
          promptCustomerForQuantity(product);
        }
        else {
          // Otherwise let them know the item is not in the inventory, re-run loadProducts
          console.log("\nThat item is not in the inventory.");
          loadProducts();
        }
      });
  }
  
  // Prompt the customer for a product quantity
  const promptCustomerForQuantity = (product) => {
    inquirer
      .prompt([
        {
          type: "input",
          name: "quantity",
          message: "How many would you like? [Quit with Q]",
          validate: function(val) {
            return val > 0 || val.toLowerCase() === "q";
          }
        }
      ])
      .then(function(val) {
        // Check if the user wants to quit the program
        checkIfShouldExit(val.quantity);
        const quantity = parseInt(val.quantity);
  
        // If there isn't enough of the chosen product and quantity, let the user know and re-run loadProducts
        if (quantity > product.stock_quantity) {
          console.log("\nInsufficient quantity!");
          loadProducts();
        }
        else {
          // Otherwise run makePurchase, give it the product information and desired quantity to purchase
          makePurchase(product, quantity);
        }
      });
  }
  
  // Purchase the desired quantity of the desired item
  const makePurchase = (product, quantity) => {
    connection.query(
      "UPDATE products SET stock_quantity = stock_quantity - ? WHERE item_id = ?",
      [quantity, product.item_id],
      function(err, res) {
        // Let the user know the purchase was successful, re-run loadProducts
        console.log("\nSuccessfully purchased " + quantity + " " + product.product_name + "'s!");
        loadProducts();
      }
    );
  }
  
  // Check to see if the product the user chose exists in the inventory
  const checkInventory = (choiceId, inventory) => {
    for (var i = 0; i < inventory.length; i++) {
      if (inventory[i].item_id === choiceId) {
        // If a matching product is found, return the product
        return inventory[i];
      }
    }
    // Otherwise return null
    return null;
  }
  
  // Check to see if the user wants to quit the program
  const checkIfShouldExit = choice => {
    if (choice.toLowerCase() === "q") {
      // Log a message and exit the current node process
      console.log("Goodbye!");
      process.exit(0);
    }
  }
  