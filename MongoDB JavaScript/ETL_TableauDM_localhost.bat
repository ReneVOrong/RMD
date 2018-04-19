REM!/usr/bin/bash

REM |------------------------------------------------------------|
REM | Filename    : MongoDB_ETL_TableauDM.bash                   |
REM | Author      : Rene V Orong                                 |
REM | Date Written: 10 Apr 2018                                  |
REM | Client      : Roche Molecular Diagnostics                  |
REM | Abstract    : Utility                                      |
REM | Description : BASH Shell script - executes JavaScripts to  |
REM |               ETL from dc to TableauDM.                    |
REM |                                                            |
REM | Usage      : ./Mongo_ETL_TableauDM.bash                    |
REM |                                                            |
REM |------------------------------------------------------------|
REM |                  MODIFICATION HISTORY                      |  
REM |------------------------------------------------------------|
REM | Modified By    Date    Ver    Description Of Modification  |
REM | -----------    ----    ---    -----------------------------|
REM | ReneVOrong  10Apr2018  1.0  1. Written.                    |
REM |------------------------------------------------------------|

REM |------------------------------------------------------------|
REM |                        FUNCTIONS                           |
REM |------------------------------------------------------------|

REM cd /opt/dc/mongo/etl


REM |------------------------------------------------------------|
REM |                        MAIN PROCEDURE                      |
REM |------------------------------------------------------------|

echo 
echo ETL TABLEAU DATA MART COLLECTIONS...
echo 

echo 
echo     Processing D_PTELSA...
echo 
mongo localhost:27017/rochedc "Aggregate dc - D_PTELSA.js"

echo 
echo     Processing F_Analysis...
echo 
mongo localhost:27017/rochedc "Aggregate dc - F_Analysis.js"

echo 
echo     Processing F_Manifest...
echo 
mongo localhost:27017/rochedc "Aggregate dc - F_Manifest.js"

echo 
echo     Processing F_Metrics...
echo 
mongo localhost:27017/rochedc "Aggregate dc - F_Metrics.js"

echo 
echo     Processing F_Performance...
echo 
mongo localhost:27017/rochedc "Aggregate dc - F_Performance.js"

echo 
echo     Creating Indexes all COLLECTIONS...
echo 
mongo localhost:27017/rochedc "Aggregate dc - Create Indexes.js"


echo 
echo END OF ETL SCRIPT, TABLEAU DM COLLECTIONS LOADED...
echo 

REM |------------------------------------------------------------|
REM |                        END OF FILE                         |
REM |------------------------------------------------------------|
