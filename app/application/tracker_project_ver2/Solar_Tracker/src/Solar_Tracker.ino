// Variables to hold photoresistors pin info
int photoCellPin1 = A0;
int photoCellPin2 = A1;
int photoCellPin3 = A2;
int photoCellPin4 = A3;

// Variables to hold light reading
int photoCellReading1 = 0;
int photoCellReading2 = 0;
int photoCellReading3 = 0;
int photoCellReading4 = 0;

// Variables to hold servo pin info

Servo servoOne;
Servo servoTwo;

int servoOnePosition = 90;
int servoTwoPosition = 90;

// Variables for solar panels

int solarPanelOnePin = A4;
int solarPanelTwoPin = A5;

double solarPanelOneVolt = 0.0;
double solarPanelTwoVolt = 0.0;

// test

int verticalDifference = 0;
int horizontalDifference = 0;
int averageTop = 0;
int averageBottom = 0;


void setup() {

  // store variables in the cloud
 Particle.variable("ldr reading1", photoCellReading1);
 Particle.variable("ldr reading2", photoCellReading2);
 Particle.variable("ldr reading3", photoCellReading3);
 Particle.variable("ldr reading4", photoCellReading4);
 Particle.variable("solar panel one volt", solarPanelOneVolt);
 Particle.variable("solar panel two volt", solarPanelTwoVolt);
 

// attach pin info to servo variable
 servoOne.attach(D2);
 servoTwo.attach(D5);

// set input mode on solar panels pins

 pinMode(A4, INPUT);
 pinMode(A5, INPUT);

// test
Particle.variable("vertical difference", verticalDifference);
Particle.variable("horizontal difference", horizontalDifference);
Particle.variable("servo one pos", servoOnePosition);
Particle.variable("servo two pos", servoTwoPosition);
Particle.variable("averageTop", averageTop);
Particle.variable("averageBottom", averageBottom);
//servoTwo.write(10);
}


void loop() {

  //Reading photocell reading 
    photoCellReading1 = analogRead(photoCellPin1); // left bottom
    photoCellReading2 = analogRead(photoCellPin2); // right bottom
    photoCellReading3 = analogRead(photoCellPin3); // left top 
    photoCellReading4 = analogRead(photoCellPin4); // right top

  //Reading solar panels voltage

  solarPanelOneVolt = (analogRead(solarPanelOnePin) * 3.3) / 4095;
  solarPanelTwoVolt = (analogRead(solarPanelTwoPin) * 3.3) / 4095;
  
  delay(200);
  verticalServoLogic();
  horizontalServoLogic();
  
}

int verticalServoLogic()
{
  int sensitivity = 100; // sensitivity for servos movement

  averageTop = (photoCellReading3 + photoCellReading4) / 2;
  averageBottom = (photoCellReading1 + photoCellReading2) / 2;

  verticalDifference = averageTop - averageBottom;

  if(-1 * sensitivity > verticalDifference || sensitivity < verticalDifference)  // changes vertical position
  {

    if (averageTop > averageBottom)
    {
      servoTwoPosition -= 1;
      
      if(servoTwoPosition < 0)
      {
        servoTwoPosition = 0;
      }
    }
    else if (averageTop < averageBottom)
    {
      servoTwoPosition += 1;

      if(servoTwoPosition > 180)
      {
        servoTwoPosition = 180;
      }
    }
    servoTwo.write(servoTwoPosition);
    horizontalServoLogic();
  }
  return 1;
}


int horizontalServoLogic()
{
  int sensitivity = 100; // sensitivity for servos movement

  int averageLeft = (photoCellReading1 + photoCellReading3) / 2;
  int averageRight = (photoCellReading2 + photoCellReading4) / 2;

  horizontalDifference = averageLeft - averageRight;

  if(-1 * sensitivity > horizontalDifference || sensitivity < horizontalDifference)  // changes horizontal position
  {
    if (averageLeft > averageRight)
    {
      servoOnePosition = servoOnePosition - 1;
      
      if(servoOnePosition > 180)
      {
        servoOnePosition = 180;
      }
    }
    else if (averageLeft < averageRight)
    {
      servoOnePosition = servoOnePosition + 1;

      if(servoOnePosition < 0)
      {
        servoOnePosition = 0;
      }
    }
    servoOne.write(servoOnePosition);
  }
  return 1;
}

