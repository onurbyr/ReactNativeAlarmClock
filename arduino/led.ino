#include <SoftwareSerial.h>
SoftwareSerial mySerial(7,6); // RX,TX

const int G = 9; 
const int B = 10;     
const int R = 11;

String RGB = ""; 
String RGB_Previous = "255,255,255"; 
String ON = "ON"; 
String OFF = "OFF"; 
boolean RGB_Completed = false;
 
void setup() {
  pinMode (R, OUTPUT);
  pinMode (G, OUTPUT);
  pinMode (B, OUTPUT);
  analogWrite(R, 255);
  analogWrite(G, 255);
  analogWrite(B, 255);
  Serial.begin(9600); 
  mySerial.begin(9600);
  RGB.reserve(30);
}
 
void loop() {
  while(mySerial.available()){
    char ReadChar = (char)mySerial.read();
 
    if(ReadChar == ')'){
      RGB_Completed = true;
    }else{
       RGB += ReadChar;
    }
  }
  
  if(RGB_Completed){
      if(RGB==ON){
          RGB = RGB_Previous; 
          lightRGB();
      }else if(RGB==OFF){
          RGB = "0,0,0"; 
          lightRGB();
      }else{
          lightRGB();   
          RGB_Previous = RGB;     
      }
      RGB = "";
      RGB_Completed = false;      
  } 
} 
 
void lightRGB(){ 
    int commaIndex = RGB.indexOf(',');
    int secondCommaIndex = RGB.indexOf(',', commaIndex + 1);
    int thirdCommaIndex = RGB.indexOf(',', secondCommaIndex + 1);

    String firstValue = RGB.substring(0, commaIndex);
    String secondValue = RGB.substring(commaIndex + 1, secondCommaIndex);
    String thirdValue = RGB.substring(secondCommaIndex+1,thirdCommaIndex);

    int rvalue = firstValue.toInt();
    int gvalue = secondValue.toInt();
    int bvalue = thirdValue.toInt();

    analogWrite(R, 255-rvalue);
    analogWrite(G, 255-gvalue);
    analogWrite(B, 255-bvalue);
}
