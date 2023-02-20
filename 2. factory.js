//factory pattern
class BronzeMember{
    constructor(name){
        this.name = name;
        this.cost = 100
    }
}

class SilverMember{
    constructor(name){
        this.name = name;
        this.cost = 200
    }
}

class GoldMember{
    constructor(name){
        this.name = name
        this.cost = 300
    }
}

class StaticObjectMemberFactory {
    static list = {
        bronze: BronzeMember,
        silver: SilverMember,
        premium: GoldMember
    }
    create(name, type = 'bronze'){
        const Member = StaticObjectMemberFactory.list[type] || StaticObjectMemberFactory.list.bronze
        const member = new Member(name);
        member.type = type
        member.define = function (){
            console.log(`${this.name} ${this.type} ${this.cost}`)
        }
        return member;
    }

}


const metalFactory = new StaticObjectMemberFactory();
const metalMembers = [
    metalFactory.create('Audun', 'bronze'),
    metalFactory.create('Elin', 'gold'),
    metalFactory.create('Per', 'silver'),
    metalFactory.create('Elizabeth', 'bronze'),
]

metalMembers.forEach(m =>{
    m.define();
})
