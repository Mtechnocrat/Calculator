
const box1=document.getElementById("box1");
const box2=document.getElementById("box2");
const box3=document.getElementById("box3");
const btn=document.getElementsByClassName("btn");

function togglefun(){
    box1.style.opacity='1';
    box2.style.opacity='0';
    box3.style.opacity='0';
    document.body.style.backgroundColor='hsl(222, 26%, 31%)';
    document.getElementById("toggle1").style.backgroundColor='hsl(224, 36%, 15%)';
    document.getElementById("grid").style.backgroundColor='hsl(224, 36%, 15%)';
    box1.style.backgroundColor='#f96c5b';
    document.getElementById("head1").style.color='white';
    document.getElementById('two').style.backgroundColor='#a2b3e1';
    document.getElementById('three').style.backgroundColor='#a2b3e1';
    document.getElementById('display').style.backgroundColor='hsl(224, 36%, 15%)';
    document.getElementById('equal').style.backgroundColor='#f96c5b';
    document.getElementById("display").style.color='white';
    

}
//hello

function togglefun2(){
    box1.style.opacity='0';
    box2.style.opacity='1';
    box3.style.opacity='0';
    box2.style.backgroundColor='#ff8b38';
    document.body.style.backgroundColor='hsl(0, 0%, 90%)';
    document.getElementById("toggle1").style.backgroundColor='hsl(0, 5%, 81%)';
    document.getElementById("grid").style.backgroundColor='hsl(0, 5%, 81%)';
    document.getElementById("head1").style.color='black';
    document.getElementById('two').style.backgroundColor='#62b5bd';
    document.getElementById('three').style.backgroundColor='#62b5bd';
    document.getElementById('display').style.backgroundColor='hsl(0, 0%, 93%)';
    document.getElementById('equal').style.backgroundColor='#ff8b38';
    document.getElementById("display").style.color='black';


}
function togglefun3(){
    box3.style.opacity='1';
    box2.style.opacity='0';
    box1.style.opacity='0';
    box3.style.backgroundColor='#94fff9';
    document.body.style.backgroundColor='hsl(268, 75%, 9%)';
    document.getElementById("toggle1").style.backgroundColor='hsl(268, 71%, 12%)';
    document.getElementById("grid").style.backgroundColor='hsl(268, 71%, 12%)';
    document.getElementById("head1").style.color='#fde631';
    document.getElementById('two').style.backgroundColor='#8530af';
    document.getElementById('three').style.backgroundColor='#8530af';
    document.getElementById('equal').style.backgroundColor='#94fff9';
    document.getElementById('equal').style.color='black';

}



box1.addEventListener("click",togglefun);
box2.addEventListener("click",togglefun2);
box3.addEventListener("click",togglefun3);

/// Calculator Input
class Calculator{
    constructor(previousOperandTextElement,currentOperandTextElement){
        this.previousOperandTextElement=previousOperandTextElement;
        this.currentOperandTextElement=currentOperandTextElement;
        this.reset();

    }

    delete(){
        this.currentOperand=this.currentOperand.toString().slice(0,-1);
    }
    reset(){
        this.currentOperand='';
        this.previousOperand='';
        this.operation=undefined;
    }
    appendNumber(number){
        if(number==='.' && this.currentOperand.includes('.')) return;
        this.currentOperand=this.currentOperand.toString()+number.toString()
    }

    chooseOperation(operation){
        if(this.currentOperand==='') return
        if(this.previousOperand!==''){
            this.compute();
        }
        this.operation=operation;
        this.previousOperand=this.currentOperand;
        this.currentOperand='';
    }

    getDisplayNumber(number){
        const stringNumber=number.toString();
        const integerDigits=parseFloat(stringNumber.split('.')[0]);
        const decimalDigits=stringNumber.split('.')[1];

        let intergerDisplay;
        if(isNaN(integerDigits)){
            intergerDisplay='';
        }else{
            intergerDisplay=integerDigits.toLocaleString('en',{maximumFractionDigits:0})
        }
        if(decimalDigits!=null){
            return `${intergerDisplay}.${integerDigits}`;
        }else{
            return intergerDisplay;
        }
    }
    compute(){
        let computation;
        const prev=parseFloat(this.previousOperand);
        const current=parseFloat(this.currentOperand);
        if(isNaN(prev) || isNaN(current)) return;
        switch(this.operation){
            case '+':
                computation=prev+current;
                break;
            case '-':
                computation=prev-current;
                break;
            case 'x':
                computation=prev*current;
                break;
            case '/':
                computation=prev/current;
                break;
            default:
                return; 
        }
        this.currentOperand=computation;
        this.operation=undefined;
        this.previousOperand='';
    }
    updateDisplay(){
        this.currentOperandTextElement.innerText=this.getDisplayNumber(this.currentOperand);
        if(this.operation!=null){
             this.previousOperandTextElement.innerText=`${this.previousOperand} ${this.operation}`;
        }else{
            this.previousOperandTextElement.innerText='';
        }

    }
}

const numberButtons=document.querySelectorAll('[data-number]');
const operationButtons=document.querySelectorAll('[data-operation]');
const equalButton=document.querySelector('[data-equal]');
const resetButton=document.querySelector('[data-reset]');
const deleteButton=document.querySelector('[data-del]');
const previousOperandTextElement=document.querySelector('[data-previous-operand]');
const currentOperandTextElement=document.querySelector('[data-current-operand]');


const calculator=new Calculator(previousOperandTextElement,currentOperandTextElement);

numberButtons.forEach(button => {
    button.addEventListener("click",() => {
        calculator.appendNumber(button.innerText);
        calculator.updateDisplay();
    })
})

operationButtons.forEach(button => {
    button.addEventListener("click",() => {
        calculator.chooseOperation(button.innerText);
        calculator.updateDisplay();
    })
})

equalButton.addEventListener('click',button =>{
    calculator.compute();
    calculator.updateDisplay();
})

resetButton.addEventListener('click',button =>{
    calculator.reset();
    calculator.updateDisplay();
})
deleteButton.addEventListener('click',button =>{
    calculator.delete();
    calculator.updateDisplay();
})