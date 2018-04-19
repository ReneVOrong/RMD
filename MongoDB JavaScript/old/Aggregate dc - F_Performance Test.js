_array       = ['asdfkjnjklsafdjhdemuxjkljsjlj']
_maxPos      = 400
_searchStart = 0
_string      = 'asdfasasdemux4365hgfg'
_field       = '$name'
_maxLen      = 400
_idxBeg      = 0
_idxEnd      = 4

print('search - ', _string.search('demux'))
print('match - ', _string.match('demux'))
print(' ')

/*
for ( i = 0; i <= _maxLen; i++ ) 
  {
     print( _array[i][i+5]  )
    
    // { $cond: { if: { $eq: [ { $substr: [ _field, i, i+5 ] }, 'demux' ] }, then: 'Lane', else: 'Sample' } }
    
    //  print( 'TraceLevel = ', _TraceLevel[i, i+5] )
  }
*/

//array[ _maxPos] = { "$cond": { "if": { "$eq": [ {"$substr": [ _field, _maxPos, 5] }, _string] }, "then": _maxPos + 1, else: 0 } }
//print( 'array = ' +  _array )
/*
for ( i = _maxPos - 1; i > _searchStart - 1; i-- ) 
     {
        _array[i] = { "$cond": { "if": { "$eq": [ { "$substr": [ _field, i, 5 ] }, _string ] }, "then": i + 1, "else": _array[i+1] } }
        print( 'array = ', _array[i] )
     }
*/

/*
db.substring.aggregate
  ({  "$project": {
           "_id": 0, 
       "machine": 1, 
     "shortName": {"$substr": [field, array[searchStart], 999] } }
  })
*/

//use rochedc;

db.dc.aggregate
  ([
      //{ $limit: 10000 },
      { $match:   {           f_filename :          /.*pipeline.*/i         ,  
                    $and: [ { name       :  { $not: /.*ck_.*/i           } },  
                  { $and: [ { name       :  { $not: /.*kill_workflow.*/i   } 
                  } ] } ] } },
                  
      { $project: { 
                    _id              :  0, 
	  	             dockey          : '$dockey', 
				    'f_type'         : '$f_type',
				     name            : '$name',
				     realtime        : '$realtime',
					 rss             : '$rss',
					'Percentage CPU' : '$percentage_cpu',
  					'f_filename'     : '$f_filename',
  					 Module          : { $substr: [ '$name', 0, { $indexOfBytes: [ '$name', ' ' ] } ] },
  					 
				     Lane            : { $indexOfBytes: [ '$name', /.*demux.*/i, 0, 200 ] } ,
				     
				  // Lane            : { $indexOfBytes: [ '$name', /.*demux.*/i, 0, { $strLenBytes: '$name' } ] } ,
   	   			    
//.......1.........2.........3.........4.......5.........6.........7.........8.........9.........1.........2.........3.........4.........6.........7.........8.........9.........1.........2.........3	  
  			     /*     
	                'Trace Level'    : 
	                  {
	                    $switch: {
	                   	           branches: [
	                   	                       { case: { $eq: [ '$name', "demux" ] }, then: 'Lane'},	                   	                      
               		                         ],
	                   		       default: 'Sample'
	                             }
	                  },  */
	                                    
	                'Load Date'      :  new ISODate()	                
	              }              
	  },  // $project
      { $out: "F_Performance_Test" } 
  ]);
  
   // Lane            : { $find: [ $name: { $search: 'demux' } ] } 
   //'Trace Level'    : { $match: { name:   /.*demux.*/i, 'demux' ] }, then: 'Lane', else: 'Sample' }}
   //'Trace Level'    : { $cond: { if: { $eq: [ $name, /.*demux.*/i ] }, then: 'Lane', else: 'Sample' }},		 
   			        // Lane            : { $text: { name, $search: "demux" } }, 			         		         
   			        //'Trace Level'    : { $cond: { if: { $eq: [ '$name': "demux" ], then: 'Lane', else: 'Sample' }}},   			        
   			        //'Trace Level'    : { $match: { name:   /.*demux.*/i, 'demux' ] }, then: 'Lane', else: 'Sample' }},
   	   			    //'Trace Level'    : { name: { $regex: "demux" } },		
  