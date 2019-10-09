export default function Field(field, value){
  let _key = field.name;
  let _value = value;

  // Return factory
  return {
    key: ()=> _key,
    value: ()=> _value,

    expr: ()=>
      `|(${_key})${_value}|`
  }
};