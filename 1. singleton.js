//1. Singleton
//Singleton is a creational design pattern that lets you ensure that a class has only one instance, 
//while providing a global access point to this instance.
//example
class Singleton {
    constructor() {
        if (!Singleton.instance) {
        Singleton.instance = this;
        }
        return Singleton.instance;
    }
    }
    const a = new Singleton();
    const b = new Singleton();
    console.log(a === b); // true




class SingleInstance{
    constructor(){
        if(!SingleInstance.instance){
            SingleInstance.instance = this;
        }
        return SingleInstance.instance
    }
}
// const a = new SingleInstance();
// const b = new SingleInstance();
// console.log(a === b); // true

