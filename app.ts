#!/usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";

let myBalance = 300000;
const myPin = 3333;

console.log(chalk.yellow("\tAssalam-o-Alaikum,\n \t \t \t************************* Welcome to my ATM Machine.*******************************"));

async function runATM() {
    let pinAnswer = await inquirer.prompt([
        {
            name: "pin",
            type: "number",
            message: "Enter your PIN code:",
        }
    ]);

    if (pinAnswer.pin !== myPin) {
        console.log(chalk.red("Incorrect PIN. Please try again."));
        runATM(); // Ask for PIN again
    } else {
        console.log(chalk.green("PIN is correct"));
        console.log(chalk.cyan(`Current AMOUNT is ${myBalance}`));

        let operationAns = await inquirer.prompt([
            {
                name: "operation",
                type: "list",
                message: "Select an operation",
                choices: ["Deposit", "Withdraw", "Check Balance", "Exit"]
            }
        ]);

        switch (operationAns.operation) {
            case "Withdraw":
                // Withdraw operation
                let amountWithdraw = await inquirer.prompt([
                    {
                        name: "amount",
                        type: "number",
                        message: "Enter the amount to withdraw:",
                    }
                ]);

                if (amountWithdraw.amount > myBalance) {
                    console.log(chalk.red("Insufficient amount to withdraw"));
                } else {
                    myBalance -= amountWithdraw.amount;
                    console.log(chalk.green(`${amountWithdraw.amount} Withdrawn Successfully`));
                    console.log(chalk.cyan(`Your Remaining Balance is: ${myBalance}`));
                }
                break;
            case "Deposit":
                // Deposit operation
                let amountDeposit = await inquirer.prompt([
                    {
                        name: "amount",
                        type: "number",
                        message: "Enter the amount to deposit:",
                    }
                ]);

                myBalance += amountDeposit.amount;
                console.log(chalk.green(`${amountDeposit.amount} Deposited Successfully`));
                console.log(chalk.cyan(`Your Updated Balance is: ${myBalance}`));
                break;
            case "Check Balance":
                // Check Balance operation
                console.log(chalk.cyan(`Your Remaining Balance is: ${myBalance}`));
                break;
            case "Exit":
                // Exit operation
                console.log(chalk.yellow("Thank you for using our ATM. Have a nice day!"));
                process.exit(0); // Terminate the program
            default:
                console.log(chalk.red("Invalid operation. Please select a valid option."));
        }
        runATM(); // Run ATM again
    }
}

runATM(); // Start the ATM
