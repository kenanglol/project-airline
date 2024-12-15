-- USER_INFO tablosu
CREATE TABLE USER_INFO (
    USER_ID SERIAL PRIMARY KEY,
    USERNAME VARCHAR(50) UNIQUE NOT NULL,
    PASSWORD VARCHAR(100) NOT NULL,
    NAME VARCHAR(50) NOT NULL,
    MIDDLE_NAME VARCHAR(50),
    SURNAME VARCHAR(50) NOT NULL,
    C_NUMBER VARCHAR(20) UNIQUE,
    PASSPORT_NO VARCHAR(20) UNIQUE,
    SEX CHAR(1) CHECK (SEX IN ('M', 'F', 'O')),
    MAIL VARCHAR(100) UNIQUE NOT NULL,
    PHONE_NUMBER VARCHAR(20),
    NATIONALITY VARCHAR(50)
);

-- PLANE tablosu
CREATE TABLE PLANE (
    PLANE_NO VARCHAR(20) PRIMARY KEY,
    PLANE_NAME VARCHAR(100) NOT NULL,
    MODEL VARCHAR(50) NOT NULL,
    CLASS VARCHAR(20) NOT NULL,
    CAPACITY INTEGER CHECK (CAPACITY > 0),
    PRODUCTION_DATE DATE NOT NULL
);

-- AIRPORT tablosu
CREATE TABLE AIRPORT (
    CODE CHAR(3) PRIMARY KEY,
    CITY VARCHAR(100) NOT NULL,
    COUNTRY VARCHAR(100) NOT NULL
);

-- FLIGHT_SCHEDULE tablosu
CREATE TABLE FLIGHT_SCHEDULE (
    SCHEDULE_ID SERIAL PRIMARY KEY,
    DEPARTURE_PORT_CODE CHAR(3) NOT NULL,
    LANDING_PORT_CODE CHAR(3) NOT NULL,
    DISTANCE DECIMAL(10,2) CHECK (DISTANCE > 0),
    FOREIGN KEY (DEPARTURE_PORT_CODE) REFERENCES AIRPORT(CODE),
    FOREIGN KEY (LANDING_PORT_CODE) REFERENCES AIRPORT(CODE),
    CHECK (DEPARTURE_PORT_CODE != LANDING_PORT_CODE)
);

-- FLIGHT_CLASS tablosu
CREATE TABLE FLIGHT_CLASS (
    CLASS_NAME VARCHAR(20) PRIMARY KEY,
    HAS_IN_FLIGHT_ENTERTAINMENT BOOLEAN DEFAULT FALSE,
    BAGGAGE_CAP_IN_PLANE INTEGER CHECK (BAGGAGE_CAP_IN_PLANE >= 0),
    BAGGAGE_CAP_UNDER_PLANE INTEGER CHECK (BAGGAGE_CAP_UNDER_PLANE >= 0),
    HAS_FOOD_SERVICE BOOLEAN DEFAULT FALSE
);

-- FLIGHT tablosu
CREATE TABLE FLIGHT (
    FLIGHT_NO VARCHAR(20) PRIMARY KEY,
    SCHEDULE INTEGER NOT NULL,
    STATUS VARCHAR(20) CHECK (STATUS IN ('SCHEDULED', 'DELAYED', 'BOARDING', 'IN_FLIGHT', 'LANDED', 'CANCELLED')),
    PLANE_NO VARCHAR(20) NOT NULL,
    DEPARTURE_TIME TIMESTAMP NOT NULL,
    ESTIMATED_DEPARTURE_TIME TIMESTAMP,
    LANDING_TIME TIMESTAMP,
    DELAY INTEGER CHECK (DELAY >= 0),
    FOREIGN KEY (SCHEDULE) REFERENCES FLIGHT_SCHEDULE(SCHEDULE_ID),
    FOREIGN KEY (PLANE_NO) REFERENCES PLANE(PLANE_NO)
);

-- STAFF tablosu
CREATE TABLE STAFF (
    STAFF_ID SERIAL PRIMARY KEY,
    NAME VARCHAR(50) NOT NULL,
    MIDDLE_NAME VARCHAR(50),
    SURNAME VARCHAR(50) NOT NULL,
    C_NUMBER VARCHAR(20) UNIQUE,
    PASSPORT_NO VARCHAR(20) UNIQUE,
    SEX CHAR(1) CHECK (SEX IN ('M', 'F', 'O')),
    JOB VARCHAR(50) NOT NULL,
    AGE INTEGER CHECK (AGE >= 18)
);

-- SEAT tablosu
CREATE TABLE SEAT (
    FLIGHT_NO VARCHAR(20),
    SEAT_NUMBER VARCHAR(10),
    CLASS_NAME VARCHAR(20) NOT NULL,
    USER_ID INTEGER,
    IS_WINDOW_SIDE BOOLEAN DEFAULT FALSE,
    IS_EMERGENCY_EXIT BOOLEAN DEFAULT FALSE,
    PRIMARY KEY (FLIGHT_NO, SEAT_NUMBER),
    FOREIGN KEY (FLIGHT_NO) REFERENCES FLIGHT(FLIGHT_NO),
    FOREIGN KEY (CLASS_NAME) REFERENCES FLIGHT_CLASS(CLASS_NAME),
    FOREIGN KEY (USER_ID) REFERENCES USER_INFO(USER_ID)
);

-- CABIN_CREW tablosu
CREATE TABLE CABIN_CREW (
    FLIGHT_NO VARCHAR(20),
    STAFF_ID INTEGER,
    PRIMARY KEY (FLIGHT_NO, STAFF_ID),
    FOREIGN KEY (FLIGHT_NO) REFERENCES FLIGHT(FLIGHT_NO),
    FOREIGN KEY (STAFF_ID) REFERENCES STAFF(STAFF_ID)
); 

-- STAFF tablosunda değişiklikler
ALTER TABLE STAFF 
    DROP COLUMN EXPERIENCE;

ALTER TABLE STAFF 
    ADD COLUMN BEFORE_EXPERIENCE INTEGER CHECK (BEFORE_EXPERIENCE >= 0),
    ADD COLUMN START_DATE DATE NOT NULL DEFAULT CURRENT_DATE;

-- Varsayılan değeri kaldırmak için (isteğe bağlı)
ALTER TABLE STAFF 
    ALTER COLUMN START_DATE DROP DEFAULT; 