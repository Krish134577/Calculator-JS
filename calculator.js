let buttons = document.querySelectorAll(".button");
let input = document.querySelector("#Enter-input");
let count = -1;                 // Count also usefull if we want any value of op inside numArray by  simply numArray[count].
let numArray = []; 
let value1 = '';
let operator;                   // Use to store current operator like + , - , * , /
let value2 = '';
let operator_added = false;    // If operator present in the string then true otherwise false.
let result; 
let base = '';                 // If user enter % sign and a operator like + or - then value entered before operator is store in base and value entered after operatored entered then it store in percent same foe value1 and value2.
let percent = '' ;             
let per_convert_val = '';      // Is used to calculate % of any no like 10% of 200 is => 20 <= this per_convert_val.

let per_exsist = false;        // TO check if percent sign is present in the string then true otherwise false.


buttons.forEach((ele) => {
    ele.addEventListener("click", function() {

            if(true != isNaN(ele.innerHTML) || ele.innerHTML == "*" || ele.innerHTML == "+" || ele.innerHTML == "-" || ele.innerHTML == "/" || ele.innerHTML == "%"){
            numArray.push(`${ele.innerHTML}`);
            input.value += `${ele.innerHTML}`;
            count++;                      // LOGIC- line 12-14 is used to add value i.e number or operator inside input or numarray.

            if(ele.innerHTML == "%"){
                per_exsist = true;
                return;
            }

            if(((true != isNaN(ele.innerHTML)) && operator_added == false)){             // LOGIC - line 17-27 is used to add number enter by user before entering operator in value1 var and operator enter by the user inside operator var and value enetred after entering operator inside value2 var.
                
                value1 += ele.innerHTML;
            }
            else if(ele.innerHTML == "*" || ele.innerHTML == "+" || ele.innerHTML == "-" || ele.innerHTML == "/"){
                operator = ele.innerHTML;
                operator_added = true;
            }
            else if(true != isNaN(ele.innerHTML) && (operator_added == true)){
                value2 += ele.innerHTML;
            } 


              
        }
        else if(ele.innerHTML === "AC"){
            operator_added = false;
            input.value = "";
            result = '';
            value1 = '';
            value2 = '';
            numArray = [];
            operator = '';
            count = -1;

        }
        else if(ele.innerHTML == "DEL"){            // Logic - control the calculation using del bttion.
            operator_added = false;  
            result = '';
            value1 = '';
            value2 = ''; 
            operator = '';
            numArray.pop(); 
            input.value = ""; 
            count--;
            numArray.forEach((num) => { 
                input.value += num;

                 
            if(((true != isNaN(num)) && operator_added == false)){             // LOGIC - line 17-27 is used to add number enter by user before entering operator in value1 var and operator enter by the user inside operator var and value enetred after entering operator inside value2 var.
                
                value1 += num;
            }
            else if(num == "*" || num == "+" || num == "-" || num == "/"){
                operator = num;
                operator_added = true;
            }
            else if(true != isNaN(num) && (operator_added == true)){
                value2 += num;
            }
            
            })
             
        }



        function handlepercent(base, percent, per_convert_val){        // If user want to calculate percent like 10% of 200 =>(This universal que to calculate eq=> 200 * 10%) or add or sub 10% or 20% of 200 in that no(200) eq(200 + 10% = 220) and eq(200 - 10% = 180). 
                    if(operator_added == true){
                        let operators = ['+' , '-', '*', '/'];
                        for(op of operators){                          // (operators) means array holding all four op and (operator) is that hold current op entered by the user in input.

                        if(op == operator){  

                            if(operator == "*"){
                                input.value = per_convert_val; 
                                numArray.push(input.value);
                                per_exsist =false;
                                result = Number(input.value);
                                value1 = '';
                                value2 = '';
                                operator = ''; 
                            }
                            else if(operator == '+'){
                                input.value = base + per_convert_val; 
                                numArray.push(input.value);
                                per_exsist =false;
                                result = Number(input.value);
                                value1 = '';
                                value2 = '';
                                operator = ''; 
                            }
                            else if(operator == "-"){
                                input.value = base - per_convert_val; 
                                numArray.push(input.value);
                                per_exsist =false;
                                result = Number(input.value);
                                value1 = '';
                                value2 = '';
                                operator = ''; 
                            }
                            else if(operator == "/"){
                                input.value = base / Number(percent / 100); 
                                numArray.push(input.value);
                                per_exsist =false;
                                result = Number(input.value);
                                value1 = '';
                                value2 = '';
                                operator = ''; 
                            }
                        } 
                    }
                    } 
                    else{
                        input.value = Number(value1) / 100;
                    }
                }



        if(ele.innerHTML === "="){                  // If user hit equal button.
            numArray = []; 

            if(value1 == ""){                  // Line 129 to 138     // calculate base value before entering operator or may be it can result  and percent is the value entered after entering operator like +,-,*,/.
            base = Number(result);
            percent = Number(value2);
            per_convert_val = Number(( base * percent) / 100);
            }
            else if(typeof(Number(value1)) == "number"){
            base = Number(value1);
            percent = Number(value2);
            per_convert_val = Number(( base * percent) / 100);
            }

            if(per_exsist == true){                              // In above if elseif the value that is base and percent is usefull if this condition become true means % exisit in the input of calculator.                                 
                handlepercent(base, percent , per_convert_val);
                 
            }

            else{                                                // If user what to do calulation and % does not exisit in input and if calculation done before means user have result of some cal and he/she want to calculate other value then the code inside this else is usefull.
                 if(typeof(result) === "number"){                             // 
                if(operator === "*" && typeof(Number(value2)) == "number"){
                 input.value = result * Number(value2);
                 numArray.push(result * Number(value2));
                 result = result * Number(value2);
                 value2 = "";
                 operator = '';
               }
               else if(operator === "+" && typeof(Number(value2)) == "number"){
                 input.value = result + Number(value2);
                 numArray.push(result + Number(value2));
                 result = result + Number(value2);
                 value2 = "";
                 operator = '';
               }
               else if(operator === "-" && typeof(Number(value2)) == "number"){
                 input.value = result - Number(value2);
                 numArray.push(result - Number(value2));
                 result = result - Number(value2);
                 value2 = "";
                 operator = '';
               }
               else if(operator === "/" && typeof(Number(value2)) == "number"){
                 input.value = result / Number(value2);
                 numArray.push(result / Number(value2));
                 result = result / Number(value2);
                 value2 = "";
                 operator = '';
               }
                    
            } 
            else{                                                        // The code inside usefull at every first calculation in calculator because the first calculation happen is due to this code where user enter some no is store in value1 var operator entered is store in operator var and value entered after op is store in value2 var the result get calculated.
                if((typeof(Number(value1)) == 'number') && (typeof(Number(value2)) == 'number')){
                    input.value = "";
                    numArray = []; 
               if(operator === "*"){
                
                result = Number(value1) * Number(value2);
                input.value = result;                              // Input.value is only to show value to user input
                numArray.push(result);                             // numArray is used to store current calculation in array.
                value1 = '';
                value2 = '';
                operator = '';
               }
               else if(operator === "+"){ 
                
                result = Number(value1) + Number(value2);
                input.value = result;
                numArray.push(result);
                value1 = '';
                value2 = '';
                operator = '';
                
               }
               else if(operator === "-"){ 

                result = Number(value1) - Number(value2);
                input.value = result;
                numArray.push(result);
                value1 = '';
                value2 = '';
                operator = '';

               }
               else if(operator === "/"){ 
                
                result = Number(value1) / Number(value2);
                input.value = result;
                numArray.push(result);
                value1 = '';
                value2 = '';
                operator = '';

               }
            }
            }
            }

            
        }
        })
         

         
    })