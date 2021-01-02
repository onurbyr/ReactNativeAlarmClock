#include <virtuabotixRTC.h>
#include <SoftwareSerial.h>

SoftwareSerial mySerial(7,6); // RX,TX

const int G = 14; //AN0
const int B = 15; //AN1    
const int R = 16; //AN2

String Val = ""; 
String RGB_Previous = "255,255,255"; 
String ON = "ON"; 
String OFF = "OFF"; 
boolean Val_Completed = false;
//RTC
virtuabotixRTC myRTC(8, 9, 10);


int offSec=-1;
int offMin=-1;
int offHour=-1;
 
void setup() {
  pinMode (R, OUTPUT);
  pinMode (G, OUTPUT);
  pinMode (B, OUTPUT);
  analogWrite(R, 255);
  analogWrite(G, 255);
  analogWrite(B, 255);
  Serial.begin(9600); 
  mySerial.begin(9600);
  Val.reserve(30);
 // saniye, dakika, saat, haftanın kaçıncı günü olduğu, ayın kaçıncı günü olduğu, ay, yıl
 //myRTC.setDS1302Time(0, 13, 2, 6, 2, 1, 2021); 
}
 
void loop() {
  while(mySerial.available()){
    char ReadChar = (char)mySerial.read();
 
    if(ReadChar == ')'){
      Val_Completed = true;
    }else{
       Val += ReadChar;
    }
  }
  
  if(Val_Completed){
    //Light on
      if(Val==ON){
        
          Val = RGB_Previous; 
          lightRGB();
      }
      //light off
      else if(Val==OFF){
          Val = "0,0,0"; 
          lightRGB();
      }
      //set timer
      else if (Val.charAt(0)=='t')
      {
        ledTimer();
        
      }
      //check timer
      else if (Val.charAt(0)=='x')
      {
        if ((offHour==-1)||(offMin==-1)||(offSec==-1) )
        {
         
        }
        else 
        {
          int remainMin=-1;
          int remainSec=-1;
          if (offHour==myRTC.hours)
          {
            remainMin=offMin-myRTC.minutes;      
          }
          else
          {
            remainMin=offMin+(60-myRTC.minutes);   
          }


          if (offSec >=  myRTC.seconds)
          {

            remainSec=offSec-myRTC.seconds;
            remainMin=remainMin+1;

          }
          else
          {
            remainSec=offSec+(60-myRTC.seconds);  
          }

   
          mySerial.print(remainMin-1);
          mySerial.print(",");
          mySerial.print(remainSec);

        }
      }
      //cancel timer
       else if (Val.charAt(0)=='c')
      {
         offMin=-1;
      }
      else{
          lightRGB();   
          RGB_Previous = Val;     
      }

      
      Val = "";
      Val_Completed = false;      
  }


  doAlways();
  


} 


void ledTimer(){
  Val.remove(0,1);
  int offGetMin=Val.toInt();
  myRTC.updateTime();


  offHour=myRTC.hours;
  offMin=myRTC.minutes+offGetMin;
  offSec=myRTC.seconds;
  
  if (offMin>=60)
  {
    offHour=offHour+1;
    if (offHour>=24)
    {
      offHour=offHour-24;
    }
    offMin=offMin-60;
  }
  



  }


  void doAlways(){
      myRTC.updateTime();


    if ((offHour==myRTC.hours)&&(offMin==myRTC.minutes)&&(offSec==myRTC.seconds))
    {
      Val = "0,0,0";
      RGB_Previous = "255,255,255"; 
      lightRGB();
      Val = "";
      offHour=-1;
      offMin=-1;
      offSec=-1;
    }
    
    
    
    }


 
void lightRGB(){ 
    int commaIndex = Val.indexOf(',');
    int secondCommaIndex = Val.indexOf(',', commaIndex + 1);
    int thirdCommaIndex = Val.indexOf(',', secondCommaIndex + 1);

    String firstValue = Val.substring(0, commaIndex);
    String secondValue = Val.substring(commaIndex + 1, secondCommaIndex);
    String thirdValue = Val.substring(secondCommaIndex+1,thirdCommaIndex);

    int rvalue = firstValue.toInt();
    int gvalue = secondValue.toInt();
    int bvalue = thirdValue.toInt();

    analogWrite(R, 255-rvalue);
    analogWrite(G, 255-gvalue);
    analogWrite(B, 255-bvalue);
}
