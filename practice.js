class BankAccount {
    #balance = 0;

    deposit(amount) {
        if (amount > 0) {
            this.#balance += amount;
        }
    }

    withdraw(amount) {
        if (amount > 0 && amount <= this) {
            this.#balance -= amount;
         }
        }

    getBalance() {
        return this.#balance;
    }
}





class Shape {
    draw() {
        console.log("drawing a shape");
    }
}

class Circle extends Shape {
    draw () {
        console.log("drawing a circle");

    }
}

class  Wectangle extends 
Shape {
    draw() {
        console.log ("drawing a rectangle");
    }
}

Task:
Create a base class Animal with a method makeSound.
Create subclasses Dog and Cat that override the makeSound method to print "Bark" and "Meow," respectively.
Create instances of Dog and Cat and call their makeSound methods to demonstrate polymorphism.
Implement this exampl


class Animal {
    makeSound() {
        console.log("making a sound");
    }
}

class Dog extends Animanl {
    makeSound() {
        console.log("bark");
    }
}

class cat extends Animal {
    makeSound() {
        console.log("meow");
    }
}
