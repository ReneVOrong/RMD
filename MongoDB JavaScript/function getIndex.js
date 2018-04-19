use rochedc

db.system.js.save
(
 {
     _id: "getIndex",
   value:  function(field, character) 
          {
             return field.substring(0, field.indexOf(character))
          }
 }
)

db.system.js.save
(
 {
     _id: "f_getString",
   value:  function( mainstring, character ) 
          {
             return mainstring.substring( 0, mainstring.indexOf( character ))
          }
 }
)

db.system.js.distinct("getIndex")    //-- list 

db.system.js.distinct("f_getString")    //-- list 

db.eval("return f_getString('chr55:adff', ':')")