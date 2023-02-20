//1. Singleton
//Singleton is a creational design pattern that lets you ensure that a class has only one instance, while providing a global access point to this instance.
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

//2. Factory
//Factory is a creational design pattern that provides an interface for creating objects in a superclass, but allows subclasses to alter the type of objects that will be created.
//example
class SimpleMembership {
    constructor(name) {
        this.name = name;
        this.cost = 50;
    }
}
class StandardMembership {
    constructor(name) {
        this.name = name;
        this.cost = 150;
    }
}
class PremiumMembership {
    constructor(name) {
        this.name = name;
        this.cost = 500;
    }
}
class MemberFactory {
    static list = {
        simple: SimpleMembership,
        standard: StandardMembership,
        premium: PremiumMembership
    }
    create(name, type = 'simple') {
        const Membership = MemberFactory.list[type] || MemberFactory.list.simple
        const member = new Membership(name);
        member.type = type;
        member.define = function() {
            console.log(`${this.name} (${this.type}): ${this.cost}`);
        }
        return member;
    }
}
const factory = new MemberFactory();
const members = [
    factory.create('Vladilen', 'simple'),
    factory.create('Elena', 'premium'),
    factory.create('Vasilisa', 'standard'),
    factory.create('Ivan', 'premium'),
    factory.create('Petr')
]
members.forEach(m => {
    m.define();
}
)

//3. Abstract Factory
//Abstract Factory is a creational design pattern that lets you produce families of related objects without specifying their concrete classes.
//example
class Dog {
    constructor(name) {
        this.name = name;
    }
    say() {
        console.log(`${this.name}: gav`);
    }
}
class Cat {
    constructor(name) {
        this.name = name;
    }
    say() {
        console.log(`${this.name}: myau`);
    }
}
class DogFactory {

    static types = {
        small: SmallDog,
        big: BigDog
    }

    create(name, type = 'small') {
        const Dog = DogFactory.types[type] || DogFactory.types.small
        return new Dog(name);
    }
}
class SmallDog extends Dog {
    say() {
        console.log(`${this.name}: gav gav`);
    }
}
class BigDog extends Dog {
    say() {
        console.log(`${this.name}: gav gav gav`);
    }
}
const factory = new DogFactory();
const dogs = [
    factory.create('Sharik', 'big'),
    factory.create('Tuzik', 'small'),
    factory.create('Bobik')
]
dogs.forEach(dog => {
    dog.say();
}
)

//4. Builder
//Builder is a creational design pattern that lets you construct complex objects step by step. The pattern allows you to produce different types and representations of an object using the same construction code.
//example
class Car {
    constructor() {
        this.autoPilot = false;
        this.parktronic = false;
        this.signaling = false;
    }
}
class CarBuilder {
    constructor() {
        this.car = new Car();
    }
    addAutoPilot(autoPilot) {
        this.car.autoPilot = autoPilot;
        return this;
    }
    addParktronic(parktronic) {
        this.car.parktronic = parktronic;
        return this;
    }
    addSignaling(signaling) {
        this.car.signaling = signaling;
        return this;
    }
    updateEngine(engine) {
        this.car.engine = engine;
        return this;
    }
    build() {
        return this.car;
    }
}
const builder = new CarBuilder();
const myCar = builder

.addAutoPilot(true)
.addParktronic(true)
.addSignaling(true)
.updateEngine('V8')
.build();
console.log(myCar);

//5. Prototype
//Prototype is a creational design pattern that lets you copy existing objects without making your code dependent on their classes.
//example
class TeslaCar {
    constructor(model, price, interior, autopilot) {
        this.model = model;
        this.price = price;
        this.interior = interior;
        this.autopilot = autopilot;
    }
    produce() {
        return new TeslaCar(this.model, this.price, this.interior, this.autopilot);
    }
}
const prototypeCar = new TeslaCar('S', 80000, 'black', false);
const car1 = prototypeCar.produce();
const car2 = prototypeCar.produce();
car1.interior = 'white';
car1.autopilot = true;
console.log(car1);
console.log(car2);

//6. Adapter
//Adapter is a structural design pattern that allows objects with incompatible interfaces to collaborate.
//example
class OldCalc {

    operations(t1, t2, operation) {
        switch (operation) {
            case 'add': return t1 + t2;
            case 'sub': return t1 - t2;
            default: return NaN;
        }
    }
}
class NewCalc {
    
        add(t1, t2) {
            return t1 + t2;
        }
        sub(t1, t2) {
            return t1 - t2;
        }
    }
class CalcAdapter {
    constructor() {
        this.calc = new NewCalc();
    }
    operations(t1, t2, operation) {
        switch (operation) {
            case 'add': return this.calc.add(t1, t2);
            case 'sub': return this.calc.sub(t1, t2);
            default: return NaN;
        }
    }
}
const oldCalc = new OldCalc();
console.log(oldCalc.operations(10, 5, 'add'));
const newCalc = new NewCalc();
console.log(newCalc.add(10, 5));
const adapter = new CalcAdapter();
console.log(adapter.operations(25, 10, 'sub'));

//7. Bridge
//Bridge is a structural design pattern that lets you split a large class or a set of closely related classes into two separate hierarchies—abstraction and implementation—which can be developed independently of each other.
//example
class Engine {
    constructor(horsepower, engineType) {
        this.horsepower = horsepower;
        this.engineType = engineType;
    }
}
class Engine2000 extends Engine {
    constructor() {
        super(2000, 'V8');
    }
}
class Engine3000 extends Engine {
    constructor() {
        super(3000, 'V8');
    }
}
class CustomEngine extends Engine {
    constructor(horsepower, engineType) {
        super(horsepower, engineType);
    }
}
class Auto {
    constructor(engine) {
        this.engine = engine;
    }
    info() {
        return `This auto has ${this.engine.horsepower} horsepower and ${this.engine.engineType} engine`;
    }
}
class BMW extends
Auto {
    constructor(engine) {
        super(engine);
    }
}
class Audi extends
Auto {
    constructor(engine) {
        super(engine);
    }
}
const engine2000 = new Engine2000();
const engine3000 = new Engine3000();
const customEngine = new CustomEngine(1500, 'V6');
const bmw = new BMW(engine2000);
const audi = new Audi(engine3000);
const audiCustom = new Audi(customEngine);
console.log(bmw.info());
console.log(audi.info());
console.log(audiCustom.info());

//8. Composite
//Composite is a structural design pattern that lets you compose objects into tree structures and then work with these structures as if they were individual objects.
//example
class Equipment {
    getPrice() {
        return this.price || 0;
    }
    getName() {
        return this.name;
    }
    setName(name) {
        this.name = name;
    }
}
class Composite extends Equipment {
    constructor() {
        super();
        this.equipments = [];
    }
    add(equipment) {
        this.equipments.push(equipment);
    }
    getPrice() {
        return this.equipments.map(equipment => equipment.getPrice()).reduce((a, b) => a + b);
    }
}   
class Engine extends Equipment {
    constructor() {
        super();
        this.price = 800;
    }
}  
class Body extends Equipment {
    constructor() {
        super();
        this.price = 3000;
    }
}
class Tools extends Equipment {
    constructor() {
        super();
        this.price = 4000;
    }
}
const car = new Composite();
const engine = new Engine();
const body = new Body();
const tools = new Tools();
car.add(engine);
car.add(body);
car.add(tools);
console.log(car.getPrice());
console.log(car);

//9. Decorator
//Decorator is a structural design pattern that lets you attach new behaviors to objects by placing these objects inside special wrapper objects that contain the behaviors.
//example
class Server {
    constructor(ip, port) {
        this.ip = ip;
        this.port = port;
    }
    get url() {
        return `https://${this.ip}:${this.port}`;
    }
}
function aws(server) {
    server.isAWS = true;
    server.awsInfo = function() {
        return server.url;
    }
    return server;
}
function azure(server) {
    server.isAzure = true;
    server.port += 500;
    return server;
}
const s1 = aws(new Server('', 8080));
console.log(s1.isAWS);
console.log(s1.awsInfo());
const s2 = azure(new Server('', 1000));
console.log(s2.isAzure);
console.log(s2.url);

//10. Facade
//Facade is a structural design pattern that provides a simplified interface to a library, a framework, or any other complex set of classes.
//example
class Complaints {
    constructor() {
        this.complaints = [];
    }
    reply(complaint) {}
    add(complaint) {
        this.complaints.push(complaint);
        return this.reply(complaint);
    }
}
class ProductComplaints extends Complaints {
    reply({id, customer, details}) {
        return `Product: ${id}: ${customer} (${details})`;
    }
}
class ServiceComplaints extends Complaints {
    reply({id, customer, details}) {
        return `Service: ${id}: ${customer} (${details})`;
    }
}
class ComplaintRegistry {
    register(customer, type, details) {
        const id = Date.now();
        let complaint;
        if (type === 'service') {
            complaint = new ServiceComplaints();
        } else {
            complaint = new ProductComplaints();
        }
        return complaint.add({id, customer, details});
    }
}
const registry = new ComplaintRegistry();
console.log(registry.register('Vladilen', 'service', 'недоступен'));
console.log(registry.register('Elena', 'product', 'вылазит ошибка'));

//11. Flyweight
//Flyweight is a structural design pattern that lets you fit more objects into the available amount of RAM by sharing common parts of state between multiple objects instead of keeping all of the data in each object.
//example
class Car {
    constructor(model, price) {
        this.model = model;
        this.price = price;
    }
}
class CarFactory {
    constructor() {
        this.cars = [];
    }
    create(model, price) {
        const candidate = this.getCar(model);
        if (candidate) {
            return candidate;
        }
        const newCar = new Car(model, price);
        this.cars.push(newCar);
        return newCar;
    }
    getCar(model) {
        return this.cars.find(car => car.model === model);
    }
}
const factory = new CarFactory();
const bmwX6 = factory.create('bmw', 10000);
const audi = factory.create('audi', 12000);
const bmwX3 = factory.create('bmw', 8000);
console.log(bmwX3 === bmwX6);

//12. Proxy
//Proxy is a structural design pattern that lets you provide a substitute or placeholder for another object. A proxy controls access to the original object, allowing you to perform something either before or after the request gets through to the original object.
//example
function networkFetch(url) {
    return `${url} - Response from server`;
}
const cache = new Set();
const proxiedFetch = new Proxy(networkFetch, {
    apply(target, thisArg, args) {
        const url = args[0];
        if (cache.has(url)) {
            return `${url} - Response from cache`;
        } else {
            cache.add(url);
            return Reflect.apply(target, thisArg, args);
        }
    }
});
console.log(proxiedFetch('angular.io'));
console.log(proxiedFetch('react.io'));
console.log(proxiedFetch('angular.io'));

//13. Chain of Responsibility
//Chain of Responsibility is a behavioral design pattern that lets you pass requests along a chain of handlers. Upon receiving a request, each handler decides either to process the request or to pass it to the next handler in the chain.
//example
class MySum {
    constructor(initialValue = 42) {
        this.sum = initialValue;
    }
    add(value) {
        this.sum += value;
        return this;
    }
}
const sum1 = new MySum();
console.log(sum1.add(8).add(10).add(3).add(1).sum);
const sum2 = new MySum(0);
console.log(sum2.add(1).add(2).add(3).add(4).sum);

//14. Command
//Command is a behavioral design pattern that turns a request into a stand-alone object that contains all information about the request. This transformation lets you parameterize methods with different requests, delay or queue a request’s execution, and support undoable operations.
//example
class MyMath {
    constructor(initialValue = 0) {
        this.num = initialValue;
    }
    square() {
        return this.num ** 2;
    }
    cube() {
        return this.num ** 3;
    }
}
class Command {
    constructor(subject) {
        this.subject = subject;
        this.commandsExecuted = [];
    }
    execute(command) {
        this.commandsExecuted.push(command);
        return this.subject[command]();
    }
}
const x = new Command(new MyMath(2));
console.log(x.execute('square'));
console.log(x.execute('cube'));
console.log(x.commandsExecuted);

//15. Iterator
//Iterator is a behavioral design pattern that lets you traverse elements of a collection without exposing its underlying representation (list, stack, tree, etc.).

//example
class MyIterator {
    constructor(data) {
        this.index = 0;
        this.data = data;
    }
    [Symbol.iterator]() {
        return {
            next: () => {
                if (this.index < this.data.length) {
                    return {
                        value: this.data[this.index++],
                        done: false
                    }
                } else {
                    this.index = 0;
                    return {
                        done: true,
                        value: void 0
                    }
                }
            }
        }
    }
}
function* generator(collection) {
    let index = 0;
    while (index < collection.length) {
        yield collection[index++];
    }
}
const iterator = new MyIterator(['This', 'is', 'iterator']);
for (const val of iterator) {
    console.log('Value: ', val);
}
const gen = generator(['This', 'is', 'iterator']);
console.log(gen.next().value);
console.log(gen.next().value);
console.log(gen.next().value);

//16. Mediator
//Mediator is a behavioral design pattern that lets you reduce chaotic dependencies between objects. The pattern restricts direct communications between the objects and forces them to collaborate only via a mediator object.
//example
class User {
    constructor(name) {
        this.name = name;
        this.room = null;
    }
    send(message, to) {
        this.room.send(message, this, to);
    }
    receive(message, from) {
        console.log(`${from.name} => ${this.name}: ${message}`);
    }
}
class ChatRoom {
    constructor() {
        this.users = {};
    }
    register(user) {
        this.users[user.name] = user;
        user.room = this;
    }
    send(message, from, to) {
        if (to) {
            to.receive(message, from);
        } else {
            Object.keys(this.users).forEach(key => {
                if (this.users[key] !== from) {
                    this.users[key].receive(message, from);
                }
            });
        }
    }
}
const vlad = new User('Vladilen');
const lena = new User('Elena');
const igor = new User('Igor');
const room = new ChatRoom();
room.register(vlad);
room.register(lena);
room.register(igor);
vlad.send('Hello!', lena);
lena.send('Hello hello!', vlad);
igor.send('Hello hello hello!');
//17. Memento
//Memento is a behavioral design pattern that lets you save and restore the previous state of an object without revealing the details of its implementation.
//example
class Memento {
    constructor(value) {
        this.value = value;
    }
}
class Caretaker {
    constructor() {
        this.values = [];
    }
    addMemento(memento) {
        this.values.push(memento);
    }
    getMemento(index) {
        return this.values[index];
    }
}
class Originator {
    constructor() {
        this.value = '';
        this.caretaker = new Caretaker();
    }
    doSomething() {
        this.value = this.generateRandomString(30);
        this.caretaker.addMemento(new Memento(this.value));
    }
    undo() {
        const memento = this.caretaker.getMemento(this.caretaker.values.length - 1);
        this.value = memento.value;
    }
    generateRandomString(length = 10) {
        const charSet = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        return Array(length)
            .fill(null)
            .map(() => charSet.charAt(Math.floor(Math.random() * charSet.length)))
            .join('');
    }
}
const originator = new Originator();
originator.doSomething();
console.log(originator.value);
originator.doSomething();
console.log(originator.value);
originator.undo();
console.log(originator.value);
//18. Observer
//Observer is a behavioral design pattern that lets you define a subscription mechanism to notify multiple objects about any events that happen to the object they’re observing.
//example
class Subject {
    constructor() {
        this.observers = [];
    }
    subscribe(observer) {
        this.observers.push(observer);
    }
    unsubscribe(observer) {
        this.observers = this.observers.filter(obs => observer !== obs);
    }
    fire(action) {
        this.observers.forEach(observer => {
            observer.update(action);
        });
    }
}
class Observer {
    constructor(state = 1) {
        this.state = state;
        this.initialState = state;
    }
    update(action) {
        switch (action.type) {
            case 'INCREMENT':
                this.state = ++this.state;
                break;
            case 'DECREMENT':
                this.state = --this.state;
                break;
            case 'ADD':
                this.state += action.payload;
                break;
            default:
                this.state = this.initialState;
        }
    }
}
const stream$ = new Subject();
const obs1 = new Observer();
const obs2 = new Observer(42);
stream$.subscribe(obs1);
stream$.subscribe(obs2);
stream$.fire({type: 'INCREMENT'});
stream$.fire({type: 'INCREMENT'});
stream$.fire({type: 'DECREMENT'});
stream$.fire({type: 'ADD', payload: 10});
console.log(obs1.state);
console.log(obs2.state);
//19. State
//State is a behavioral design pattern that lets an object alter its behavior when its internal state changes. It appears as if the object changed its class.
//example
class Light {
    constructor(light) {
        this.light = light;
    }
}
class RedLight extends Light {
    constructor() {
        super('red');
    }
    sign
}
class YellowLight extends Light {
    constructor() {
        super('yellow');
    }
    sign
}
class GreenLight extends Light {
    constructor() {
        super('green');
    }
    sign
}
class TrafficLight {
    constructor() {
        this.states = [
            new RedLight(),
            new YellowLight(),
            new GreenLight()
        ];
        this.current = this.states[0];
    }
    change() {
        const total = this.states.length;
        let index = this.states.findIndex(light => light === this.current);
        if (index + 1 < total) {
            this.current = this.states[index + 1];
        } else {
            this.current = this.states[0];
        }
    }
    sign() {
        return this.current.sign;
    }
}
const traffic = new TrafficLight();
console.log(traffic.sign());
traffic.change();
console.log(traffic.sign());
traffic.change();
console.log(traffic.sign());
traffic.change();
console.log(traffic.sign());
//20. Strategy
//Strategy is a behavioral design pattern that lets you define a family of algorithms, put each of them into a separate class, and make their objects interchangeable.
//example
class Vehicle {
    travelTime() {
        return this.timeTaken;
    }
}
class Bus extends
    Vehicle {
    constructor() {
        super();
        this.timeTaken = 10;
    }
}
class Taxi extends
    Vehicle {
    constructor() {
        super();
        this.timeTaken = 5;
    }
}
class Car extends
    Vehicle {
    constructor() {
        super();
        this.timeTaken = 3;
    }
}
class Commute {
    travel(transport) {
        return transport.travelTime();
    }
}
const commute = new Commute();
console.log(commute.travel(new Taxi()));
console.log(commute.travel(new Bus()));
//21. Template Method
//Template Method is a behavioral design pattern that defines the skeleton of an algorithm in the superclass but lets subclasses override specific steps of the algorithm without changing its structure.
//example
class Employee {
    constructor(name, salary) {
        this.name = name;
        this.salary = salary;
    }
    responsibilities() {
    }
    work() {
        return `${this.name} does ${this.responsibilities()}`;
    }
    getPaid() {
        return `${this.name} has salary ${this.salary}`;
    }
}
class Developer extends
    Employee {
    constructor(name, salary) {
        super(name, salary);
    }
    responsibilities() {
        return 'programming';
    }
}
class Tester extends
    Employee {
    constructor(name, salary) {
        super(name, salary);
    }
    responsibilities() {
        return 'testing';
    }
}
const dev = new Developer('Vladilen', 100000);
console.log(dev.getPaid());
console.log(dev.work());
const tester = new Tester('Elena', 90000);
console.log(tester.getPaid());
console.log(tester.work());

//22. Visitor
//Visitor is a behavioral design pattern that lets you separate algorithms from the objects on which they operate.
//example
class Monkey {
    shout() {
        return 'Ooh oo aa aa!';
    }
}
class Lion {
    roar() {
        return 'Roaaar!';
    }
}
class Dolphin {
    speak() {
        return 'Tuut tutt tuutt!';
    }
}
class MonkeyKing {
    constructor() {
        this.monkey = new Monkey();
    }
    shout() {
        return this.monkey.shout();
    }
}
class Speak {
    visit(monkey) {
        return monkey.shout();
    }
    visit(lion) {
        return lion.roar();
    }
    visit(dolphin) {
        return dolphin.speak();
    }
}
const monkey = new Monkey();
const lion = new Lion();
const dolphin = new Dolphin();
const monkeyKing = new MonkeyKing();
const speak = new Speak();
console.log(speak.visit(monkey));
console.log(speak.visit(lion));
console.log(speak.visit(dolphin));
console.log(speak.visit(monkeyKing));

//23. Interpreter
//Interpreter is a behavioral design pattern that implements a specialized language.
//example
class Interpreter
{
    constructor(input)
    {
        this.input = input;
    }
    interpret()
    {
        let output = 0;
        for (let i = 0; i < this.input.length; i++)
        {
            const token = this.input[i];
            if (token === '+')
            {
                output++;
            }
            else if (token === '-')
            {
                output--;
            }
        }
        return output;
    }
}
const interpreter = new Interpreter('+ + + -');
console.log(interpreter.interpret());




