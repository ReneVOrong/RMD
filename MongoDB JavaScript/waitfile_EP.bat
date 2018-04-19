echo off
REM |------------------------------------------------------------------------------------------------------------------------------------
REM | File Name     :  waitfile_EP.bat
REM | Author          :  René V Orong
REM | Date Written:  01 May 2014
REM | Abstract        :  Waits for trigger file, then fires up the cpfil batch
REM |
REM |                          Modification History
REM | Modified By    Date            Version     Description of Modifications
REM | --------------------      -------             ------------      ------------------------------------------------
REM | ReneVOrong   01May2014       1.0         1.  Initial Version
REM |
REM |
REM |------------------------------------------------------------------------------------------------------------------------------------

setlocal
  set _Path=F:\endpoint\To_Adamas
  set _trigfile=%_Path%\endpointfile
  
REM --- wait time set to 60 seconds
  set _time=60
  

:WAIT_LOOP
 
     echo ...waiting
     sleep %_time%
 
     if not exist %_trigfile% goto :WAIT_LOOP
 
 echo
 echo ---trigger file is here, process files
 
     start cmd /c cpfil_EP.bat
 
 echo
 echo ------files processed, delete trigger file, go to wait state
 
del %_trigfile%
 
goto :WAIT_LOOP


 
REM |--- endfile



