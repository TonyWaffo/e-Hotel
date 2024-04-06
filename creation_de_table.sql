create table chaine_hotel(
	chaine_id char(10),
	Nom char(50),
	adresse varchar(50),
	nombre_hotel int,
	email varchar(50),
	telephone BIGINT,
	PRIMARY KEY (chaine_id));
	
create table hotel(
	hotel_id char(10),
	Nom char(50),
	nombre_chambre int,
	adresse varchar(50),
	email varchar(50),
	telephone BIGINT,
	nombre_etoile int,
	chaine_id char(10),
	primary key (hotel_id),
	foreign key (chaine_id)
	references chaine_hotel
		on delete cascade
		on update cascade
	);
	
create table chambre(
	chambre_id char(10),
	prix int,
	capacite int,
	commodite varchar(50),
	vue varchar(20),
	extensible boolean,
	probleme varchar(50),
	hotel_id char(10),
	primary key (chambre_id),
	foreign key (hotel_id)
	references hotel
		on delete cascade
		on update cascade
);

create table gestionnaire(
	gestionnaire_id char(50),
	hotel_id char(10),
	primary key (gestionnaire_id),
	foreign key (hotel_id)
	references hotel
		on delete cascade
		on update cascade
);

create table employe(
	employe_id char(10),
	Nom char(50),
	adresse varchar(50),
	telephone BIGINT,
	role char(50),
	nas char(10),
	primary key (employe_id));
	
create table travaille_pour(
	hotel_id char(10),
	employe_id char(10),
	primary key(hotel_id, employe_id),
	foreign key(hotel_id)
	references hotel
		on delete cascade
		on update cascade,
	foreign key(employe_id)
	references employe
		on delete cascade
		on update cascade
);

create table archives(
	archives_id char(10),
	date_debut varchar(20),
	date_fin varchar(20),
	primary key(archives_id)
);

create table client(
	client_id char(10),
	Nom char(50),
	adresse varchar(50),
	nas char(10),
	telephone BIGINT,
	date_enregistrement varchar(20),
	primary key(client_id)
);

create table reservation(
	reservation_id char(10),
	date_reservation varchar(20),
	employe_id char(10),
	client_id char(10),
	archive_id char(10),
	chambre_id char(10),
	primary key (reservation_id),
	foreign key (employe_id)
	references employe
		on delete cascade
		on update cascade,
	foreign key (client_id)
	references client
		on delete cascade
		on update cascade,
	foreign key (archive_id)
	references archives
		on delete cascade
		on update cascade,
	foreign key (chambre_id)
	references chambre
		on delete cascade
		on update cascade
);
create table location(
	location_id char(10),
	date_location varchar(20),
	montant int,
	employe_id char(10),
	client_id char(10),
	reservation_id char(10),
	chambre_id char(10),
	archives_id char(10),
	primary key(location_id),
	foreign key (employe_id)
	references employe
		on delete cascade
		on update cascade,
	foreign key (client_id)
	references client
		on delete cascade
		on update cascade,
	foreign key (reservation_id)
	references reservation
		on delete cascade
		on update cascade,
	foreign key (chambre_id)
	references chambre
		on delete cascade
		on update cascade,
	foreign key (archives_id)
	references archives
		on delete cascade
		on update cascade
	);
