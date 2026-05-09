//create a simple arrow function that takes two numbers and returns their sum
import {test} from '@playwright/test'
test("practiceTest",()=>{
let res=(a:number,b:number):number=>{
    console.log("Using arrow function");
return a+b;
}

console.log(res(6,7));
})
