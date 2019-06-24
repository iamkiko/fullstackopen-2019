//experimentation and examples

const Hello = ({ name, age }) => {
    /* passing the params instead of props is the same as:
   const { name, age } = props --OR--
  const name = props.name
   const age = props.age*/

   //The person's age does not have to be passed as a parameter to the function - it can directly access all props that are passed to the component.
   const bornYear = () => new Date().getFullYear() - age
       /*same as: const bornYear = () => {
       return new Date().getFullYear() - age
       } */
   return (
       <div>
           <p>Hello {name}, you are {age} years old</p>
           <p>So you were probably born in {bornYear()}</p>
       </div>
   )
}