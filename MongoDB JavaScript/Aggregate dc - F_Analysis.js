
/*----------------------------------------------
 Filename    :  Aggregate dc - F_Analysis.js
 Author      :  Rene V Orong
 Date Written:  02 April 2018
 Abstract    :  MongoDB Fast Extract-Transform-Load from one collection to another collection.
                
                *MongoDB aggregate does not have a "toString" function, even in v3.6.
                *Will use $substr: to coerce conversion of numeric to string.
                
 Usage       :  1.  from the JavaScript file directory:  > mongo localhost:27017/rochedc "Aggregate dc - F_Analysis.js"
                2.            or, from the mongo shell:  > load("Aggregate dc - F_Analysis.js")        
                                
 Change History
    By         Date     Ver     Description
    --         ----     ---     -----------
 ReneVOrong  02Apr2018  v1   1. Written 

 ----------------------------------------------*/
//.......1.........2.........3.........4.......5.........6.........7.........8.........9.........1.........2.........3.........4.........6.........7.........8.........9.........1.........2.........3	        
//use rochedc;

db.dc.aggregate
  ([
      //{ $limit: 100000 },
      { $match:   {  f_type     : { $in: [ 'fusion', 'cnv', 'snv', 'indels' ] } } },
      { $project: { _id         :  0, 
	  	             dockey     :  1, 
	  	             chrom      :  1,
	  	             chromstart :  1,
	  	             chromend   :  1,
   	  	             pos        :  1,
   	  	             name       :  1,
   	  	             gene       :  1,
   	  	            'gene name' : '$gene_name',
   	  	             region1    :  1,
   	  	             region2    :  1,
   	  	             break1     :  1,
   	  	             break2     :  1,
	  	            'Variant'   : '$f_type',      
	                'Which Gene': 
	                  {
	                    $switch: {
	                   	           branches: [
	                   	                       { case: { $eq: [ '$f_type', 'cnv'    ] }, then: '$Name'},
	                   	                       { case: { $eq: [ '$f_type', 'indels' ] }, then: '$Gene'},
	                   	                       { case: { $eq: [ '$f_type', 'snv'    ] }, then: '$Gene Name'},
	                   	                       { case: { $eq: [ '$f_type', 'fusion' ] }, then: { $concat: [ { $ifNull: [ '$region1', '?' ] }, '_', 
	                   	                                                                                    { $ifNull: [ '$region2', '?' ] }
	                   	                                                                                  ] } } 
               		                         ],
	                   		       default: ''
	                             }
	                  },                  
	                 'Which Chromosome': 
	                  {
	                    $switch: {
	                   	           branches: [
	                   	                       { case: { $eq: [ '$f_type', 'cnv'    ] }, then: '$chrom'},
	                   	                       { case: { $eq: [ '$f_type', 'indels' ] }, then: '$chrom'},
	                   	                       { case: { $eq: [ '$f_type', 'snv'    ] }, then: '$chrom,'},
	                   	                       { case: { $eq: [ '$f_type', 'fusion' ] }, then: { $concat: [ { $substr: [ '$break1', 0, { $indexOfBytes: [ '$break1', ':' ] } ] }, '_', 
	                   	                                                                                    { $substr: [ '$break2', 0, { $indexOfBytes: [ '$break2', ':' ] } ] }         
	                   	                                                                                  ] } }
               		                         ],
	                   		       default: ''
	                             }
	                  },	                           	              
	                 'Variant Values': 
	                  {
	                    $switch: { 
	                   	           branches: [
	                   	                       { case: { $eq: [ '$f_type', 'cnv'    ] }, then: { $concat: [ { $ifNull: [  '$chrom',                                       '?' ] }, '|',
	                   	                                                                                    { $ifNull: [ { $substr: [ '$chromstart',          0, 12 ] },  '?' ] }, '|',
	                   	                                                                                    { $ifNull: [ { $substr: [ '$chromend',            0, 12 ] },  '?' ] }, '|',
	                   	                                                                                    { $ifNull: [  '$name',                                        '?' ] }, '|',
	                   	                                                                                    { $ifNull: [ { $substr: [ '$scorepvalue',         0, 12 ] },  '?' ] }
	                   	                                                                                  ] } },    	                       	                   	                      
	                   	                       { case: { $eq: [ '$f_type', 'indels' ] }, then: { $concat: [ { $ifNull: [  '$chrom',                                       '?' ] }, '|',
	                   	                                                                                    { $ifNull: [ { $substr: [ '$pos',                 0, 12 ] },  '?' ] }, '|',
                                                                                                            { $ifNull: [  '$id',                                          '?' ] }, '|',
                                                                                                            { $ifNull: [  '$ref',                                         '?' ] }, '|',
                                                                                                            { $ifNull: [  '$alt',                                         '?' ] }, '|', 
                                                                                                            { $ifNull: [ { $substr: [ '$qual',                0, 12 ] },  '?' ] }, '|',
                                                                                                            { $ifNull: [  '$filter',                                      '?' ] }, '|',
                                                                                                            { $ifNull: [ { $substr: [ '$dp',                  0, 12 ] },  '?' ] }, '|',
                                                                                                            { $ifNull: [ { $substr: [ '$altdp',               0, 12 ] },  '?' ] }, '|',
                                                                                                            { $ifNull: [ { $substr: [ '$af',                  0, 12 ] },  '?' ] }, '|',
                                                                                                            { $ifNull: [ { $substr: [ '$af2',                 0, 12 ] },  '?' ] }, '|',
                                                                                                            { $ifNull: [ { $substr: [ '$af3',                 0, 12 ] },  '?' ] }, '|',
                                                                                                            { $ifNull: [  '$whitelist',                                   '?' ] }, '|',
                                                                                                            { $ifNull: [  '$indel',                                       '?' ] }, '|',
                                                                                                            { $ifNull: [  '$ss',                                          '?' ] }, '|',
                                                                                                            { $ifNull: [  '$sid',                                         '?' ] }, '|',
                                                                                                            { $ifNull: [ { $substr: [ '$score1',               0, 12 ] }, '?' ] }, '|',
                                                                                                            { $ifNull: [ { $substr: [ '$score2',               0, 12 ] }, '?' ] }, '|',
                                                                                                            { $ifNull: [ { $substr: [ '$score3',               0, 12 ] }, '?' ] }, '|',
                                                                                                            { $ifNull: [ { $substr: [ '$mmpm',                 0, 12 ] }, '?' ] }, '|',
                                                                                                            { $ifNull: [  '$gene',                                        '?' ] }, '|',
                                                                                                            { $ifNull: [  '$transcript',                                  '?' ] }, '|',
                                                                                                            { $ifNull: [  '$cdna',                                        '?' ] }, '|',
                                                                                                            { $ifNull: [  '$aacid',                                       '?' ] }, '|',
                                                                                                            { $ifNull: [  '$format',                                      '?' ] },            	                       
	                   	                                                                                  ] } },	                   	                       
	                   	                       { case: { $eq: [ '$f_type', 'snv'    ] }, then: { $concat: [ { $ifNull: [  '$Chrom',                                       '?' ] }, '|',
                                                                                                            { $ifNull: [ { $substr: [ '$pos',                  0, 12 ] }, '?' ] }, '|',
                                                                                                            { $ifNull: [  '$id',                                          '?' ] }, '|',
                                                                                                            { $ifNull: [  '$ref',                                         '?' ] }, '|',
                                                                                                            { $ifNull: [  '$alt',                                         '?' ] }, '|',
                                                                                                            { $ifNull: [ { $substr: [ '$qual',                 0, 12 ] }, '?' ] }, '|',
                                                                                                            { $ifNull: [  '$filter',                                      '?' ] }, '|',
                                                                                                            { $ifNull: [ { $substr: [ '$dp',                   0, 12 ] }, '?' ] }, '|',
                                                                                                            { $ifNull: [ { $substr: [ '$altdp',                0, 12 ] }, '?' ] }, '|',
                                                                                                            { $ifNull: [ { $substr: [ '$mmpm',                 0, 12 ] }, '?' ] }, '|',
                                                                                                            { $ifNull: [ { $substr: [ '$dp2',                  0, 12 ] }, '?' ] }, '|',
                                                                                                            { $ifNull: [ { $substr: [ '$altdp2',               0, 12 ] }, '?' ] }, '|',
                                                                                                            { $ifNull: [ { $substr: [ '$af',                   0, 12 ] }, '?' ] }, '|',
                                                                                                            { $ifNull: [ { $substr: [ '$nged',                 0, 12 ] }, '?' ] }, '|',
                                                                                                            { $ifNull: [  '$whitelist',                                   '?' ] }, '|',
                                                                                                            { $ifNull: [  '$ss',                                          '?' ] }, '|',
                                                                                                            { $ifNull: [  '$sid',                                         '?' ] }, '|',
                                                                                                            { $ifNull: [ { $substr: [ '$score1',               0, 12 ] }, '?' ] }, '|',
                                                                                                            { $ifNull: [ { $substr: [ '$score2',               0, 12 ] }, '?' ] }, '|',
                                                                                                            { $ifNull: [  '$indel',                                       '?' ] }, '|',
                                                                                                            { $ifNull: [  '$smid',                                        '?' ] }, '|',
                                                                                                            { $ifNull: [  '$smaf',                                        '?' ] }, '|',
                                                                                                            { $ifNull: [ { $substr: [ '$exact_af',             0, 12 ] }, '?' ] }, '|',
                                                                                                            { $ifNull: [ { $substr: [ '$tcga_count',           0, 12 ] }, '?' ] }, '|',
                                                                                                            { $ifNull: [  '$dbsnp_af',                                    '?' ] }, '|',
                                                                                                            { $ifNull: [  '$cosmic_site_count',                           '?' ] }, '|',
                                                                                                            { $ifNull: [  '$dbsnp_common',                                '?' ] }, '|',
                                                                                                            { $ifNull: [  '$dbsnp_id',                                    '?' ] }, '|',
                                                                                                            { $ifNull: [ { $substr: [ '$cosmic_count',         0, 12 ] }, '?' ] }, '|',
                                                                                                            { $ifNull: [  '$cosmic_site_count_somatic',                   '?' ] }, '|',
                                                                                                            { $ifNull: [ { $substr: [ '$kg_af',                0, 12 ] }, '?' ] }, '|',
                                                                                                            { $ifNull: [  '$cosmic_id',                                   '?' ] }, '|',
                                                                                                            { $ifNull: [  '$tcga_types',                                  '?' ] }, '|',
                                                                                                            { $ifNull: [  '$gene_name',                                   '?' ] }, '|',
                                                                                                            { $ifNull: [  '$gene_id',                                     '?' ] }, '|',
                                                                                                            { $ifNull: [  '$germline',                                    '?' ] }, '|',
                                                                                                            { $ifNull: [  '$somatic',                                     '?' ] }, '|',
                                                                                                            { $ifNull: [  '$format',                                      '?' ] }, 
	                   	                                                                                  ] } },	                   	                      	                   	                                                                                  	                   	                                                                                  
	                   	                       { case: { $eq: [ '$f_type', 'fusion' ] }, then: { $concat: [ { $ifNull: [  '$est_type',                                    '?' ] }, '|',
                                                                                                            { $ifNull: [  '$region1',                                     '?' ] }, '|',
                                                                                                            { $ifNull: [  '$region2',                                     '?' ] }, '|',
                                                                                                            { $ifNull: [  '$break1',                                      '?' ] }, '|',
                                                                                                            { $ifNull: [  '$break2',                                      '?' ] }, '|',
                                                                                                            { $ifNull: [ { $substr: [ '$break_support1',       0, 12 ] }, '?' ] }, '|',
                                                                                                            { $ifNull: [ { $substr: [ '$break_support2',       0, 12 ] }, '?' ] }, '|',
                                                                                                            { $ifNull: [ { $substr: [ '$break_offset',         0, 12 ] }, '?' ] }, '|',
                                                                                                            { $ifNull: [  '$orientation',                                 '?' ] }, '|',
                                                                                                            { $ifNull: [  '$order1',                                      '?' ] }, '|',
                                                                                                            { $ifNull: [  '$order2',                                      '?' ] }, '|',
                                                                                                            { $ifNull: [ { $substr: [ '$brake_depth',          0, 12 ] }, '?' ] }, '|',
                                                                                                            { $ifNull: [ { $substr: [ '$proper_pair_support',  0, 12 ] }, '?' ] }, '|',
                                                                                                            { $ifNull: [ { $substr: [ '$unmapped_support',     0, 12 ] }, '?' ] }, '|',
                                                                                                            { $ifNull: [ { $substr: [ '$total_depth',          0, 12 ] }, '?' ] }, '|',
                                                                                                            { $ifNull: [  '$fusion_seq',                                  '?' ] }, '|',
                                                                                                            { $ifNull: [  '$nontemplated_seq',                            '?' ] },             
                   	                                                                                      ] } }              	                                  
               		                         ],
	                   		        default: ''
	                             },
	                          },       
	  	            'Load Date' :  new ISODate()                            
	              }  // $project	              
	  },  // $aggregate
      { $out: "F_Analysis" } 
  ]);
  
  
//---- endScript


//  db.getCollection("F_Analysis").createIndex({ "dockey": 1 }, { "name": "dockey" })
