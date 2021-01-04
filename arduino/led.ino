#include <virtuabotixRTC.h>
#include <SoftwareSerial.h>

SoftwareSerial mySerial(8,7); // RX,TX

const int R = 9;
const int G = 10;
const int B = 11;  


String Val = ""; 
String RGB_Previous = "255,255,255"; 
String ON = "ON"; 
String OFF = "OFF"; 
boolean Val_Completed = false;
//RTC
virtuabotixRTC myRTC(4, 5, 6);


int offSec=-1;
int offMin=-1;
int offHour=-1;

float brightness;

int rvalue=0;
int gvalue=0;
int bvalue=0;

String B2 = "B2"; 

int fadebr = 0;
int fadeAmount = 1;
int fadecolor = R;
boolean fadeMode = false;
 
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
          commaIndex();
          lightRGB();
      }
      //light off
      else if(Val==OFF){
          Val = "0,0,0"; 
          commaIndex();
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
        checkTimer();
      }
      //cancel timer
       else if (Val.charAt(0)=='c')
      {
         offMin=-1;
      }
      //brightness
       else if (Val.charAt(0)=='b')
      {
         ledBrightness();
      }
      //check brightness
      else if (Val==B2)
      {
         mySerial.print(brightness);
      }
      //fadeeffect
       else if (Val.charAt(0)=='f')
      {
         fadeEffect();
      }
      else{
          commaIndex();
          lightRGB();  
          RGB_Previous = Val;
          brightness=100;     
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


  void checkTimer()
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

  

  void ledBrightness()
  {
    Val.remove(0,1);
    brightness=float(Val.toInt());
    
    Val = RGB_Previous; 


    commaIndex();
    
    rvalue=(float)(brightness/100)*rvalue;
    gvalue=(float)(brightness/100)*gvalue;
    bvalue=(float)(brightness/100)*bvalue;


    lightRGB();



  }

  void fadeEffect ()
  {
    
    Val.remove(0,1);

    if (Val=="r")
    {
      fadecolor=R;
      analogWrite(G, 255);    
      analogWrite(B, 255);   
    }
    else if (Val=="g")
    {
      fadecolor=G;
      analogWrite(B, 255);    
      analogWrite(R, 255);   
      
    }
    else if (Val=="b")
    {
      fadecolor=B;
      analogWrite(G, 255);    
      analogWrite(R, 255); 
    }
    else 
    {
      int valfl=Val.toInt();
      if (valfl>=1 && valfl<=10 )
      {
        fadeAmount=valfl;
      }
    }


    fadeMode = true;

   
    
  }






  void doAlways(){
      myRTC.updateTime();


    if ((offHour==myRTC.hours)&&(offMin==myRTC.minutes)&&(offSec==myRTC.seconds))
    {
      Val = "0,0,0";
      RGB_Previous = "255,255,255"; 
      commaIndex();
      lightRGB();
      Val = "";
      offHour=-1;
      offMin=-1;
      offSec=-1;
    }
    
    if(fadeMode)
    {
      analogWrite(fadecolor, 255-(fadebr));
      fadebr = fadebr + fadeAmount;
      if (fadebr<5)
      {
        fadebr=5;
        fadeAmount = -fadeAmount;
      }
      if (fadebr>250)
      {
        fadebr=250;
        fadeAmount = -fadeAmount;
      }
      delay(30);
    }
    
    
    
    }



  
  void commaIndex()
  {
    int commaIndex = Val.indexOf(',');
    int secondCommaIndex = Val.indexOf(',', commaIndex + 1);
    int thirdCommaIndex = Val.indexOf(',', secondCommaIndex + 1);

    String firstValue = Val.substring(0, commaIndex);
    String secondValue = Val.substring(commaIndex + 1, secondCommaIndex);
    String thirdValue = Val.substring(secondCommaIndex+1,thirdCommaIndex);

    rvalue = firstValue.toInt();
    gvalue = secondValue.toInt();
    bvalue = thirdValue.toInt();
    
  }



 
  void lightRGB(){ 
    fadeMode = false;
    analogWrite(R, 255-rvalue);
    analogWrite(G, 255-gvalue);
    analogWrite(B, 255-bvalue);
}
