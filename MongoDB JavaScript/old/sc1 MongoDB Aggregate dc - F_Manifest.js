/*----------------------------------------------
 Filename    :  aggregate F_Manifest.js
 Author      :  Rene V Orong
 Date Written:  29 March 2018
 Abstract    :  MongoDB Fast Extract-Transform-Load from one collection to another collection.
                PTELSA and Run Time Dimension
 Change History
    By         Date     Ver     Description
    --         ----     ---     -----------
 ReneVOrong  29Mar2018  v1   1. Written 

 ----------------------------------------------*/

//use rochedc;
use TableauDM;

db.dc.aggregate
  ([
      { $match:   {  f_type       : 'manifest' } },
	  { $project: { _id           :  0, 
	  	             dockey       : '$dockey', 
	  	             Adapter      : '$adapter',
    	  	        'Adapter Type': '$adaptertype',
	                'Sample Type' : '$sample_type', 
	                'bfxmode'     : '$bfxmode',
					 Panel        : '$panel',
					'Input Mass'  : '$inputmass',
   		            'Load Date'   :  new ISODate()
				  } 
	  }, 
      { $out: "F_Manifest" } 
  ]);
  
//---- endScript


//  db.getCollection("F_Manifest").createIndex({ "dockey": 1 }, { "name": "dockey_unique", "unique": true })