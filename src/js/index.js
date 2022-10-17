const tblStudents = document.getElementById('tbl-students');
const btnNew = document.getElementById('btn-new');
const btnSave = document.getElementById('btn-save');
const btnClear = document.getElementById('btn-clear');
const txtID = document.getElementById('txt-ID');
const txtName = document.getElementById('txt-name');
const txtAddress = document.getElementById('txt-address');
const txtContact = document.getElementById('txt-contact');
const frmStudent = document.getElementById('frm-student');



const regExp4Name = /^[A-Za-z ]+$/;
const regExp4Address = /^[A-Za-z0-9,:./\- ]+$/;
const regExp4Contact = /^\d{3}-\d{7}$/;
const students=[];
let selectedStudent = null;


class Student{
    id;
    #name;
    address;
    #contact;
    rowElm;
    #nameCell;
    #contactCell;

    set name(name){
        this.name=name;
        this.#nameCell.innerText=name;
    }
    get name(){
        return this.#name;
    }
    set contact(contact){
        this.contact=contact;
        this.#contactCell.innerText=contact;
    }
    get contact(){
        return this.#contact;
    }
   
    constructor(id, name, address, contact){
        this.rowElm = tblStudents.tBodies[0].insertRow();
        const idCell = this.rowElm.insertCell();
        this.#nameCell = this.rowElm.insertCell();
        this.#contactCell = this.rowElm.insertCell();
        const removeCell = this.rowElm.insertCell();
        
        this.id = id;
        idCell.innerText = this.id;
        this.name = name; // here name is an accessor property
        //since here new value is assigned to name accessor property set name function will invoke
        //same for contact
        this.address = address;
        this.contact = contact;
        removeCell.innerHTML = '<i class="bi bi-trash3"></i>';

        tblStudents.classList.remove('empty');

        /* removeCell.querySelector('i').addEventListener('click',()=>{
            this.rowElm.remove();   
        }); */

        this.rowElm.addEventListener('click',()=>{
            students.forEach(student => student.rowElm.classList.remove('selected'));
            this.rowElm.classList.add('selected');

            txtID.value=this.id;
            txtName.value=this.name;
            txtContact.value=this.contact;
            txtAddress.value=this.address;
            
            btnSave.innerText='Update Student';
            selectedStudent = this;
        });
    } 
}

tblStudents.tBodies[0].addEventListener('click',({target:elm})=>{
    
    if(elm && elm.tagName ==='i'.toUpperCase() && elm.classList.contains('bi-trash3')){
        const elmRow = elm.closest("tr");
        const index = students.findIndex(student => student.rowElm==elmRow);
        students.splice(index,1);
        elmRow.remove();


        if(!tblStudents.tBodies[0].rows.length){
            tblStudents.classList.add('empty');
        }
    }
});

btnNew.addEventListener('click', ()=>{
    [txtID, txtName, txtAddress, txtContact, btnSave, btnClear].forEach(ctrl => ctrl.disabled = false);
    txtID.value=generatedNewStudentId();
    txtName.focus;
    btnClear.click();
    students.forEach(student => student.rowElm.classList.remove('selected'));
    btnSave.innerText='Save Student';
    selectedStudent = null;
});

const inputListener = (eventData) => {
    eventData.target.classList.remove('is-invalid');
};

[txtName, txtContact, txtAddress].forEach(input => input.addEventListener('input', inputListener));

frmStudent.addEventListener('submit',(eventData)=>{
    eventData.preventDefault();
});
frmStudent.addEventListener('reset',(eventData)=>{
    eventData.preventDefault();
    [txtName, txtContact, txtAddress].forEach(input => {
        input.value='';
        input.classList.remove('is-invalid');
        btnClear.click();
    });
    txtName.focus;
});
btnSave.addEventListener('click', ()=>{
    let invalidInput = null;
    if(!regExp4Name.test(txtName.value.trim())){
        txtName.classList.add('is-invalid');
        invalidInput=txtName
        txtName.focus();

    }
    if(!regExp4Address.test(txtAddress.value)){
        txtName.classList.add('is-invalid');
        if(!invalidInput) invalidInput=txtAddress;

    }
    if(!regExp4Contact.test(txtContact.value)){
        txtContact.classList.add('is-invalid');
        if(!invalidInput) invalidInput=txtContact;
    }
    if(invalidInput){
        invalidInput.select();
        return;
    }

    if(btnSave.innerText==='Save Student'){
        students.push(new Student(txtID.value,txtName.value,txtAddress.value,txtContact.value));
    }else{
        selectedStudent.name=txtName.value;
        selectedStudent.address=txtAddress.value;
        selectedStudent.contact=txtContact.value;
    }
});

function generatedNewStudentId(){
    return "S001";
}
