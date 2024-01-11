/*==============================================================*/
/* DBMS name:      MySQL 5.0                                    */
/* Created on:     12/12/2023 10:42:31                          */
/*==============================================================*/
use sys;
create database if not exists acciones;
use acciones;

drop table if exists ACCION;

drop table if exists CARTERA_ACCIONES;

drop table if exists PERSONA;

/*==============================================================*/
/* Table: ACCION                                                */
/*==============================================================*/
create table ACCION
(
   IDACCION             int not null,
   IDCARTERA            int not null,
   NOMBREACCION         text,
   FECHACOMPRA          date,
   PRECIOACCION         float,
   CANTIDAD             int,
   COSTOTOTAL           float,
   primary key (IDACCION)
);

/*==============================================================*/
/* Table: CARTERA_ACCIONES                                      */
/*==============================================================*/
create table CARTERA_ACCIONES
(
   IDCARTERA            int not null,
   CANTIDADTOTAL        float,
   primary key (IDCARTERA)
);

/*==============================================================*/
/* Table: PERSONA                                               */
/*==============================================================*/
create table PERSONA
(
   IDPERSONA            int not null,
   IDCARTERA            int,
   NOMBRE               text,
   APELLIDO             text,
   CEDULA               text,
   primary key (IDPERSONA)
);

CREATE TABLE STOCK (
    IDSTOCK INT AUTO_INCREMENT PRIMARY KEY,
    PRICE DECIMAL NOT NULL
);

alter table ACCION add constraint FK_RELATIONSHIP_2 foreign key (IDCARTERA)
      references CARTERA_ACCIONES (IDCARTERA) on delete restrict on update restrict;

alter table PERSONA add constraint FK_RELATIONSHIP_1 foreign key (IDCARTERA)
      references CARTERA_ACCIONES (IDCARTERA) on delete restrict on update restrict;

