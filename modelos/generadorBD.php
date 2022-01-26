<?php
	include('conexion.php');

	mysql_query("create table alumno(id integer auto_increment not null primary key,nombre varchar(70) not null,a_p varchar(50) not null,a_m varchar(50) not null,sexo varchar(1) not null,ultres integer,periodo varchar(4),carrera_interes varchar(100),clave varchar(100)) ");
    mysql_query("create table test(id integer auto_increment not null primary key,num_preg integer,pregunta varchar(100))");
    mysql_query("create table area(id integer auto_increment not null primary key,nom_a varchar(30))");
    mysql_query("create table usuario(id integer auto_increment primary key,user varchar(10) not null,pss varchar(150) not null,rol varchar(10))");
    mysql_query("create table grupo(id integer auto_increment not null primary key,nombre varchar(6) not null,id_ori integer,foreign key (id_ori) references usuario(id))");
    mysql_query("create table g_alu(id_al integer,id_g integer,foreign key (id_al) references alumno(id),foreign key (id_g) references grupo(id))");
    mysql_query("create table rel_a_p(id_area integer,id_preg integer,foreign key (id_area) references area(id),foreign key (id_preg) references test(id))");
    mysql_query("create table respuestas(id_test integer,id_al integer,respuesta integer,foreign key (id_al) references alumno(id),foreign key (id_test) references test(id))");
    
    mysql_query("create table evaluacion(id_ev integer auto_increment primary key,id_al integer,id_area integer,puntaje integer,percentil integer,periodo varchar(4),id_evaluador integer,foreign key (id_al) references alumno(id),foreign key (id_area) references area(id),foreign key (id_evaluador) references usuario(id))");
    mysql_query("create table puntaje_percentil(id integer auto_increment primary key,id_area integer,puntaje integer,sexo varchar(1),percentil integer,foreign key (id_area) references area(id))");
    mysql_query("create table administracion(id integer auto_increment primary key,id_evaluador integer,foreign key (id_evaluador) references usuario(id) )");
    // mysql_query("create table bitacora(id integer auto_increment primary key,actividad varchar(100),quien integer,cuando ,foreign key (id_evaluador) references usuario(id) )");
    // insert into bitacora (actividad,quien,cuando,hora,rol,ipusuario,visto)
    echo "Tablas generadas correctamente";
    
?> 