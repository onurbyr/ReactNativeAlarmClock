#include <virtuabotixRTC.h>
#include <Adafruit_GFX.h>  
#include <Adafruit_ST7735.h>  
#include <virtuabotixRTC.h> 



   
#define TFT_RST    -1  
#define TFT_DC     2
#define TFT_CS     3

Adafruit_ST7735 tft = Adafruit_ST7735(TFT_CS,  TFT_DC, TFT_RST);

const int R = 9;
const int G = 10;
const int B = 5;  

const int speakerPin=7;
const int button=8;
const int LDRPin = A0;
const int lm35 = A1;

String Val = ""; 
String RGB_Previous = "255,255,255"; 
String ON = "ON"; 
String OFF = "OFF"; 
boolean Val_Completed = false;
//RTC
virtuabotixRTC myRTC(4, 12, 6);


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


String alarm1="";
String alarm2="";
String alarm3="";
String alarm4="";
String alarm5="";

unsigned long lastTime = 0;
unsigned long lastTime2 = 0;
boolean ldrMode = false;


float voltage = 0;
float temp = 0;
int inc_data = 0;
 
void setup() {
  pinMode (R, OUTPUT);
  pinMode (G, OUTPUT);
  pinMode (B, OUTPUT);
  pinMode (speakerPin,OUTPUT);
  pinMode(button, INPUT);
  pinMode(LDRPin, INPUT);
  analogWrite(R, 255);
  analogWrite(G, 255);
  analogWrite(B, 255);
  Serial.begin(9600); 
  Val.reserve(30);
 // saniye, dakika, saat, haftanın kaçıncı günü olduğu, ayın kaçıncı günü olduğu, ay, yıl
 //myRTC.setDS1302Time(0, 8, 2, 6, 16, 1, 2021); 
 tft.initR(INITR_BLACKTAB);
 tft.fillScreen(ST7735_BLACK);
 tft.setTextWrap(false);
}
 
void loop() {
  while(Serial.available()){
    char ReadChar = (char)Serial.read();
 
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
        ldrMode = false;
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
        ldrMode = false;
        ledBrightness();
      }
      //check brightness
      else if (Val==B2)
      {
         Serial.print(brightness);
      }
      //fadeeffect
       else if (Val.charAt(0)=='f')
      {
        ldrMode = false;
        fadeEffect();
      }
      //modes
       else if (Val.charAt(0)=='m')
      {
        ldrMode = false;
        setMode();
      }
      //alarm
      else if (Val.charAt(0)=='a')
      {
         setAlarm();
      }
      //ldr mode
      else if (Val.charAt(0)=='l')
      {
        fadeMode = false;
        ldrMode = true;
      }
      //ldr mode off
      else if (Val.charAt(0)=='n')
      {
         ldrMode = false;
      }
      else if (Val.charAt(0)=='o')
      {
         Serial.print(ldrMode);
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
    Serial.print(remainMin-1);
    Serial.print(",");
    Serial.print(remainSec);
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


  void setMode(){
    Val.remove(0,1);

    int commaIndex = Val.indexOf(',');
    int secondCommaIndex = Val.indexOf(',', commaIndex + 1);
    int thirdCommaIndex = Val.indexOf(',', secondCommaIndex + 1);
    int fourthCommaIndex = Val.indexOf(',', thirdCommaIndex + 1);

    String firstValue = Val.substring(0, commaIndex);
    String secondValue = Val.substring(commaIndex + 1, secondCommaIndex);
    String thirdValue = Val.substring(secondCommaIndex+1,thirdCommaIndex);
    String fourthValue = Val.substring(thirdCommaIndex+1,fourthCommaIndex);

    rvalue = firstValue.toInt();
    gvalue = secondValue.toInt();
    bvalue = thirdValue.toInt();

    brightness=float(fourthValue.toInt());


    rvalue=(float)(brightness/100)*rvalue;
    gvalue=(float)(brightness/100)*gvalue;
    bvalue=(float)(brightness/100)*bvalue;

    lightRGB();

    Val=firstValue+','+secondValue+','+thirdValue;
    RGB_Previous = Val;
        
  }


  void setAlarm(){
    Val.remove(0,1);
    

    int commaIndex = Val.indexOf(',');
    int secondCommaIndex = Val.indexOf(',', commaIndex + 1);
    int thirdCommaIndex = Val.indexOf(',', secondCommaIndex + 1);
    int fourthCommaIndex = Val.indexOf(',', thirdCommaIndex + 1);
    int fifthCommaIndex = Val.indexOf(',', fourthCommaIndex + 1);

    String firstValue = Val.substring(0, commaIndex)+":00";
    String secondValue = Val.substring(commaIndex + 1, secondCommaIndex)+":00";
    String thirdValue = Val.substring(secondCommaIndex+1,thirdCommaIndex)+":00";
    String fourthValue = Val.substring(thirdCommaIndex+1,fourthCommaIndex)+":00";
    String fifthValue = Val.substring(fourthCommaIndex+1,fifthCommaIndex)+":00";


    alarm1=firstValue;
    alarm2=secondValue;
    alarm3=thirdValue;
    alarm4=fourthValue;
    alarm5=fifthValue;


    


    
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




    if (millis() - lastTime2 > 1000)
    {
      if (ldrMode)
      {
      int bramount = analogRead(LDRPin);
      if (bramount>100)
      {
        brightness=100;
      }
      else if ((bramount >80) && (bramount<= 100))
      {
        brightness=75;
      }
      else if ((bramount >60) && (bramount<= 80))
      {
        brightness=50;
      }
      else if ((bramount >30) && (bramount<= 60))
      {
        brightness=35;
      }
      else if ((bramount >0) && (bramount<= 30))
      {
        brightness=25;
      }

      String Val2 = RGB_Previous; 

      int commaIndex = Val2.indexOf(',');
      int secondCommaIndex = Val2.indexOf(',', commaIndex + 1);
      int thirdCommaIndex = Val2.indexOf(',', secondCommaIndex + 1);

      String firstValue = Val2.substring(0, commaIndex);
      String secondValue = Val2.substring(commaIndex + 1, secondCommaIndex);
      String thirdValue = Val2.substring(secondCommaIndex+1,thirdCommaIndex);

      rvalue = firstValue.toInt();
      gvalue = secondValue.toInt();
      bvalue = thirdValue.toInt();

      rvalue=(float)(brightness/100)*rvalue;
      gvalue=(float)(brightness/100)*gvalue;
      bvalue=(float)(brightness/100)*bvalue;

      analogWrite(R, 255-rvalue);
      analogWrite(G, 255-gvalue);
      analogWrite(B, 255-bvalue);

      }
      lastTime2 = millis();
    }



     



    if (millis() - lastTime > 1000)
    {
      inc_data = analogRead(lm35);
      voltage = (inc_data / 1023.0) * 5000;
      temp = voltage / 10.0;


      tft.setCursor(13, 10);  
      tft.setTextColor(ST7735_YELLOW, ST7735_BLACK);  
      tft.setTextSize(1);  
      tft.println("Sicaklik:"); 


      tft.setCursor(70, 10); 
      tft.setTextColor(ST7735_YELLOW, ST7735_BLACK);  
      tft.setTextSize(1);  
      tft.println(temp);  

      String daymonth = String(myRTC.dayofmonth);
      String mnth = String(myRTC.month);
      String yr = String(myRTC.year);

      String hr = String(myRTC.hours);
      String mnt = String(myRTC.minutes);
      String sec = String(myRTC.seconds);

      if (myRTC.dayofmonth<10)
      {
        daymonth='0'+daymonth;
      }
      if(myRTC.month<10)
      {
        mnth='0'+mnth;
      }

      if (myRTC.hours<10)
      {
        hr='0'+hr;
      }
      if (myRTC.minutes<10)
      {
        mnt='0'+mnt;
      }
      if (myRTC.seconds<10)
      {
        sec='0'+sec;
      }

      String date= daymonth+'/'+mnth+'/'+yr;

      String time = hr+':'+mnt+':'+sec;


      if ((time==alarm1)||(time==alarm2)||(time==alarm3)||(time==alarm4)||(time==alarm5))
      {
        tone(speakerPin, 493);
      }


      tft.setCursor(5, 50);  
      tft.setTextColor(ST7735_YELLOW, ST7735_BLACK);  
      tft.setTextSize(2);  
      tft.println(date);  


      tft.setCursor(15, 80);  
      tft.setTextColor(ST7735_YELLOW, ST7735_BLACK); 
      tft.setTextSize(2); 
      tft.println(time);  

      
     
      lastTime = millis(); 
    }



    if(digitalRead(button)==1)
    { 
      noTone(speakerPin);
      Serial.println("asd");
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
