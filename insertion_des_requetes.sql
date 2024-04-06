INSERT INTO chaine_hotel(chaine_id, Nom, adresse, nombre_hotel, email, telephone)
VALUES
('ch001', 'Lancaster Premium', '180 avenue Lancaster', 16, 'LancasterP@gmail.com', 5551234567),
('ch002', 'One Piece Luxury', '200 boulevard One Piece', 17, 'OnePieceL@gmail.ca', 5552345678),
('ch003', 'Luchester Exclusive', '250 rue Luchester', 18, 'LuchesterE@gmail.com', 5553456789),
('ch004', 'Meridien Elite', '90 promenade Meridien', 19, 'MeridienE@gmail.com', 5554567890),
('ch005', 'Alsace Grand', '50 avenue Alsace', 20, 'AlsaceG@gmail.com', 5555678901);

/* Insertion des hotels pour chaque chaine hoteliere au moins 08 par chaine hoteliere */

INSERT INTO hotel(hotel_id, Nom, Nombre_chambre, adresse, email, telephone, nombre_etoile, chaine_id)
VALUES
('h001', 'Azure Sky', 26, '12 rue des Cieux', 'AzureSky@gmail.com', '5295001234', 04, 'ch001'),
('h002', 'Golden Gate', 30, '48 boulevard du Portail', 'GoldenGate@gmail.com', '5296002345', 05, 'ch001'),
('h003', 'Ruby Retreat', 18, '6 allée des Rubis', 'RubyRetreat@gmail.com', '5297003456', 03, 'ch001'),
('h004', 'Pearl Harbor', 35, '88 quai des Perles', 'PearlHarbor@gmail.com', '5298004567', 04, 'ch001'),
('h005', 'Emerald Estate', 22, '77 rue des Émeraudes', 'EmeraldEstate@gmail.com', '5299005678', 04, 'ch001'),
('h006', 'Sapphire Springs', 40, '2 avenue des Saphirs', 'SapphireSprings@gmail.com', '5300006789', 05, 'ch001'),
('h007', 'Opal Oasis', 19, '11 chemin de l’Opale', 'OpalOasis@gmail.com', '5301007890', 03, 'ch001'),
('h008', 'Diamond Dale', 27, '33 route des Diamants', 'DiamondDale@gmail.com', '5302008901', 04, 'ch001');

UPDATE chaine_hotel SET nombre_hotel = 08 WHERE chaine_id = 'ch001';

INSERT INTO hotel(hotel_id, Nom, Nombre_chambre, adresse, email, telephone, nombre_etoile, chaine_id)
VALUES
('h009', 'OceanView', 42, '88 rue de l’Océan', 'OceanView@gmail.com', '4261002345', 05, 'ch002'),
('h010', 'Starlight', 37, '3 boulevard des Étoiles', 'Starlight@gmail.com', '4262003465', 05, 'ch002'),
('h011', 'Sunrise', 20, '71 avenue Sunrise', 'Sunrise@gmail.com', '4263004576', 03, 'ch002'),
('h012', 'Moonlight', 30, '93 rue de la Lune', 'Moonlight@gmail.com', '4264005687', 04, 'ch002'),
('h013', 'Highland', 26, '55 montée des Hauteurs', 'Highland@gmail.com', '4265006798', 04, 'ch002'),
('h014', 'Lakeside', 45, '117 quai du Lac', 'Lakeside@gmail.com', '4266007809', 05, 'ch002'),
('h015', 'Parkview', 22, '32 rue du Parc', 'Parkview@gmail.com', '4267008910', 03, 'ch002'),
('h016', 'Riverbank', 35, '76 bord de la Rivière', 'Riverbank@gmail.com', '4268009021', 04, 'ch002');

UPDATE chaine_hotel SET nombre_hotel = 08 WHERE chaine_id = 'ch002';

INSERT INTO hotel(hotel_id, Nom, Nombre_chambre, adresse, email, telephone, nombre_etoile, chaine_id)
VALUES
('h017', 'Crimson Canyon', 28, '44 rue du Canyon', 'CrimsonCanyon@gmail.com', '5303001234', 04, 'ch003'),
('h018', 'Blue Lagoon', 32, '17 avenue Lagon Bleu', 'BlueLagoon@gmail.com', '5304002345', 05, 'ch003'),
('h019', 'Silver Shore', 21, '6 quai Argenté', 'SilverShore@gmail.com', '5305003456', 03, 'ch003'),
('h020', 'Golden Grove', 37, '55 boulevard des Groves', 'GoldenGrove@gmail.com', '5306004567', 04, 'ch003'),
('h021', 'Jade Jungle', 25, '98 route de la Jungle', 'JadeJungle@gmail.com', '5307005678', 04, 'ch003'),
('h022', 'Ruby Ridge', 40, '23 chemin de la Crête', 'RubyRidge@gmail.com', '5308006789', 05, 'ch003'),
('h023', 'Opal Ocean', 22, '11 rue de l’Océan', 'OpalOcean@gmail.com', '5309007890', 03, 'ch003'),
('h024', 'Sapphire Shore', 29, '37 plage des Saphirs', 'SapphireShore@gmail.com', '5310008901', 04, 'ch003');

UPDATE chaine_hotel SET nombre_hotel = 08 WHERE chaine_id = 'ch003';

INSERT INTO hotel(hotel_id, Nom, Nombre_chambre, adresse, email, telephone, nombre_etoile, chaine_id)
VALUES
('h025', 'Forest Haven', 24, '18 rue des Bois', 'ForestH@gmail.com', '5271002345', 04, 'ch004'),
('h026', 'Mountain Peak', 30, '92 chemin des Cimes', 'MountainP@gmail.com', '5272003465', 05, 'ch004'),
('h027', 'Urban Retreat', 19, '27 avenue de la Ville', 'UrbanR@gmail.com', '5273004576', 03, 'ch004'),
('h028', 'Sea Breeze', 34, '11 boulevard de la Mer', 'SeaB@gmail.com', '5274005687', 04, 'ch004'),
('h029', 'Skyline', 40, '55 rue des Horizons', 'Skyline@gmail.com', '5275006798', 05, 'ch004'),
('h030', 'Valley Lodge', 22, '78 vallée du Silence', 'ValleyL@gmail.com', '5276007809', 03, 'ch004'),
('h031', 'City Center', 28, '3 place du Centre', 'CityC@gmail.com', '5277008910', 04, 'ch004'),
('h032', 'Sunset Villa', 25, '44 chemin du Couchant', 'SunsetV@gmail.com', '5278009021', 04, 'ch004');

UPDATE chaine_hotel SET nombre_hotel = 08 WHERE chaine_id = 'ch004';

INSERT INTO hotel(hotel_id, Nom, Nombre_chambre, adresse, email, telephone, nombre_etoile, chaine_id)
VALUES
('h033', 'Lakefront', 27, '9 quai du Lac', 'Lakefront@gmail.com', '5279001234', 04, 'ch005'),
('h034', 'Pine Woods', 32, '43 route des Pins', 'PineWoods@gmail.com', '5280002345', 05, 'ch005'),
('h035', 'Golden Sands', 20, '67 plage des Sables', 'GoldenSands@gmail.com', '5281003456', 03, 'ch005'),
('h036', 'Harbor View', 35, '22 rue du Port', 'HarborView@gmail.com', '5282004567', 04, 'ch005'),
('h037', 'Meadowlands', 28, '58 prairie des Fleurs', 'Meadowlands@gmail.com', '5283005678', 04, 'ch005'),
('h038', 'Summit Peak', 40, '99 col des Sommets', 'SummitPeak@gmail.com', '5284006789', 05, 'ch005'),
('h039', 'Creek Side', 22, '11 ruelle du Ruisseau', 'CreekSide@gmail.com', '5285007890', 03, 'ch005'),
('h040', 'Sunshine Coast', 30, '80 bord de la Côte', 'SunshineCoast@gmail.com', '5286008901', 04, 'ch005');

UPDATE chaine_hotel SET nombre_hotel = 08 WHERE chaine_id = 'ch005';

INSERT INTO chambre(chambre_id, prix, capacite, commodite, vue, extensible, probleme, hotel_id)
VALUES
('room001', 120, 1, 'TV, Air conditionné', 'mer', False, 'No', 'h001'),
('room002', 130, 2, 'TV, Air conditionné, Wi-Fi', 'jardin', False, 'No', 'h002'),
('room003', 140, 1, 'TV, Wi-Fi', 'montagne', False, 'No', 'h002'),
('room004', 150, 2, 'TV, Air conditionné, Wi-Fi, Minibar', 'mer', True, 'No', 'h003'),
('room005', 160, 2, 'TV, Air conditionné, Wi-Fi, Minibar', 'jardin', False, 'No', 'h004'),
('room006', 170, 3, 'TV, Air conditionné, Wi-Fi, Balcon', 'ville', False, 'No', 'h005'),
('room007', 180, 2, 'TV, Air conditionné, Wi-Fi, Minibar, Balcon', 'montagne', True, 'No', 'h006'),
('room008', 190, 3, 'TV, Air conditionné, Wi-Fi, Minibar, Balcon', 'jardin', False, 'No', 'h007'),
('room009', 200, 4, 'TV, Air conditionné, Wi-Fi, Minibar, Jacuzzi', 'ville', True, 'No', 'h008'),
('room010', 210, 1, 'TV, Air conditionné, Wi-Fi, Minibar, Terrasse', 'mer', False, 'No', 'h008');

INSERT INTO chambre(chambre_id, prix, capacite, commodite, vue, extensible, probleme, hotel_id)
VALUES
('room011', 220, 1, 'TV, Air conditionné', 'jardin', False, 'No', 'h009'),
('room012', 230, 2, 'TV, Air conditionné, Wi-Fi', 'mer', True, 'No', 'h010'),
('room013', 240, 2, 'TV, Wi-Fi, Balcon', 'ville', False, 'No', 'h011'),
('room014', 250, 3, 'TV, Air conditionné, Wi-Fi, Minibar', 'montagne', False, 'No', 'h012'),
('room015', 260, 3, 'TV, Air conditionné, Wi-Fi, Minibar, Balcon', 'montagne', True, 'No', 'h013'),
('room016', 270, 2, 'TV, Air conditionné, Wi-Fi, Jacuzzi', 'ville', False, 'No', 'h014'),
('room017', 280, 4, 'TV, Air conditionné, Wi-Fi, Minibar, Jacuzzi', 'mer', True, 'No', 'h015'),
('room018', 290, 1, 'TV, Air conditionné, Wi-Fi, Terrasse', 'jardin', False, 'No', 'h016');

INSERT INTO chambre(chambre_id, prix, capacite, commodite, vue, extensible, probleme, hotel_id)
VALUES
('room019', 300, 1, 'TV, Air conditionné, Wi-Fi', 'ville', False, 'No', 'h017'),
('room020', 310, 2, 'TV, Air conditionné, Wi-Fi, Balcon', 'jardin', True, 'No', 'h017'),
('room021', 320, 2, 'TV, Wi-Fi, Minibar', 'mer', False, 'No', 'h018'),
('room022', 330, 3, 'TV, Air conditionné, Wi-Fi, Minibar', 'ville', True, 'No', 'h019'),
('room023', 340, 1, 'TV, Air conditionné, Minibar, Balcon', 'montagne', False, 'No', 'h020'),
('room024', 350, 3, 'TV, Wi-Fi, Minibar, Jacuzzi', 'mer', True, 'No', 'h020'),
('room025', 360, 2, 'TV, Air conditionné, Wi-Fi, Balcon', 'montagne', False, 'No', 'h021'),
('room026', 370, 4, 'TV, Air conditionné, Wi-Fi, Minibar, Jacuzzi', 'jardin', True, 'No', 'h021'),
('room027', 380, 2, 'TV, Wi-Fi, Minibar, Balcon', 'mer', False, 'No', 'h022'),
('room028', 390, 3, 'TV, Air conditionné, Wi-Fi, Minibar, Terrasse', 'ville', True, 'No', 'h022'),
('room029', 400, 4, 'TV, Air conditionné, Wi-Fi, Jacuzzi', 'jardin', False, 'No', 'h023'),
('room030', 410, 1, 'TV, Air conditionné, Minibar, Terrasse', 'mer', True, 'No', 'h024');

INSERT INTO chambre(chambre_id, prix, capacite, commodite, vue, extensible, probleme, hotel_id)
VALUES
('room031', 420, 1, 'TV, Air conditionné, Wi-Fi', 'mer', False, 'No', 'h025'),
('room032', 430, 2, 'TV, Air conditionné, Wi-Fi, Balcon', 'ville', True, 'No', 'h026'),
('room033', 440, 2, 'TV, Wi-Fi, Minibar', 'jardin', False, 'No', 'h026'),
('room034', 450, 3, 'TV, Air conditionné, Wi-Fi, Minibar', 'mer', True, 'No', 'h026'),
('room035', 460, 1, 'TV, Air conditionné, Minibar, Balcon', 'montagne', False, 'No', 'h027'),
('room036', 470, 3, 'TV, Wi-Fi, Minibar, Jacuzzi', 'jardin', True, 'No', 'h028'),
('room037', 480, 2, 'TV, Air conditionné, Wi-Fi, Balcon', 'mer', False, 'No', 'h028'),
('room038', 490, 4, 'TV, Air conditionné, Wi-Fi, Minibar, Jacuzzi', 'ville', True, 'No', 'h029'),
('room039', 500, 2, 'TV, Wi-Fi, Minibar, Balcon', 'jardin', False, 'No', 'h030'),
('room040', 510, 3, 'TV, Air conditionné, Wi-Fi, Minibar, Terrasse', 'mer', True, 'No', 'h030'),
('room041', 520, 4, 'TV, Air conditionné, Wi-Fi, Jacuzzi', 'ville', False, 'No', 'h031'),
('room042', 530, 1, 'TV, Air conditionné, Minibar, Terrasse', 'jardin', True, 'No', 'h031'),
('room043', 540, 2, 'TV, Air conditionné, Wi-Fi, Minibar, Balcon', 'mer', False, 'No', 'h032'),
('room044', 550, 3, 'TV, Air conditionné, Wi-Fi, Jacuzzi, Balcon', 'ville', True, 'No', 'h032');

INSERT INTO chambre(chambre_id, prix, capacite, commodite, vue, extensible, probleme, hotel_id)
VALUES
('room045', 560, 1, 'TV, Air conditionné, Wi-Fi', 'ville', False, 'No', 'h033'),
('room046', 570, 2, 'TV, Air conditionné, Wi-Fi, Balcon', 'jardin', True, 'No', 'h033'),
('room047', 580, 2, 'TV, Wi-Fi, Minibar', 'mer', False, 'No', 'h033'),
('room048', 590, 3, 'TV, Air conditionné, Wi-Fi, Minibar', 'ville', True, 'No', 'h034'),
('room049', 600, 1, 'TV, Air conditionné, Minibar, Balcon', 'jardin', False, 'No', 'h035'),
('room050', 610, 3, 'TV, Wi-Fi, Minibar, Jacuzzi', 'mer', True, 'No', 'h036'),
('room051', 620, 2, 'TV, Air conditionné, Wi-Fi, Balcon', 'ville', False, 'No', 'h035'),
('room052', 630, 4, 'TV, Air conditionné, Wi-Fi, Minibar, Jacuzzi', 'jardin', True, 'No', 'h036'),
('room053', 640, 2, 'TV, Wi-Fi, Minibar, Balcon', 'mer', False, 'No', 'h036'),
('room054', 650, 3, 'TV, Air conditionné, Wi-Fi, Minibar, Terrasse', 'ville', True, 'No', 'h037'),
('room055', 660, 4, 'TV, Air conditionné, Wi-Fi, Jacuzzi', 'jardin', False, 'No', 'h038'),
('room056', 670, 1, 'TV, Air conditionné, Minibar, Terrasse', 'mer', True, 'No', 'h038'),
('room057', 680, 2, 'TV, Air conditionné, Wi-Fi, Minibar, Balcon', 'ville', False, 'No', 'h039'),
('room058', 690, 3, 'TV, Air conditionné, Wi-Fi, Jacuzzi, Balcon', 'montagne', True, 'No', 'h039'),
('room059', 700, 1, 'TV, Air conditionné, Wi-Fi, Minibar, Terrasse', 'mer', False, 'No', 'h040'),
('room060', 710, 2, 'TV, Air conditionné, Wi-Fi, Minibar, Jacuzzi', 'ville', True, 'No', 'h040');

INSERT INTO gestionnaire(gestionnaire_id, hotel_id)
VALUES
('Mike Ross', 'h001'),
('Harvey Specter', 'h002'),
('Rachel Zane', 'h003'),
('Jessica Pearson', 'h004'),
('Louis Litt', 'h005'),
('Donna Paulsen', 'h006'),
('Katrina Bennett', 'h007'),
('Robert Zane', 'h008'),
('Daniel Hardman', 'h009'),
('Alex Williams', 'h010'),
('Sheila Sazs', 'h011'),
('Dana Scott', 'h012'),
('Jeff Malone', 'h013'),
('Sean Cahill', 'h014'),
('Brian Altman', 'h015'),
('Jenny Griffith', 'h016'),
('Trevor Evans', 'h017'),
('Norma', 'h018'),
('Nathan', 'h019'),
('Oliver', 'h020'),
('Anita Gibbs', 'h021'),
('Benjamin', 'h022'),
('Gretchen Bodinski', 'h023'),
('Elliot Stemple', 'h024'),
('Tommy Bratton', 'h025'),
('Jack Soloff', 'h026'),
('Travis Tanner', 'h027'),
('Stephen Huntley', 'h028'),
('Cameron Dennis', 'h029'),
('Jimmy Kirkwood', 'h030'),
('Frank Gallo', 'h031'),
('Terrence Wolf', 'h032'),
('Laura Zane', 'h033'),
('Lily Specter', 'h034'),
('Stan Jacobson', 'h035'),
('Tony Gianopoulos', 'h036'),
('Ava Hessington', 'h037'),
('Charles Forstman', 'h038'),
('Gerald Tate', 'h039'),
('Marcus Specter', 'h040');

INSERT INTO employe(employe_id, Nom, adresse, telephone, role, nas)
VALUES
('136247', 'John Doe', '123 Elm St', 8192749017, 'réceptionniste', '987654322'),
('136248', 'Jane Smith', '456 Maple Ave', 8192749018, 'serveur', '987654323'),
('136249', 'Jim Brown', '789 Oak Blvd', 8192749019, 'cuistot', '987654324'),
('136250', 'Jenny Griffith', '321 Pine St', 8192749020, 'gestionnaire', '987654325'),
('136251', 'David Jones', '654 Cedar Rd', 8192749021, 'gardien', '987654326'),
('136252', 'Sarah Wilson', '987 Spruce Ln', 8192749022, 'femme de chambre', '987654327'),
('136253', 'James Johnson', '246 Birch Pl', 8192749023, 'concierge', '987654328'),
('136254', 'Patricia Taylor', '135 Chestnut St', 8192749024, 'barman', '987654329'),
('136255', 'Michael Lee', '864 Walnut Ave', 8192749025, 'réceptionniste', '987654330'),
('136256', 'Emily Harris', '423 Elmwood Rd', 8192749026, 'serveur', '987654331'),
('136257', 'Robert Clark', '537 Maplewood Dr', 8192749027, 'cuistot', '987654332'),
('136258', 'Jack Soloff', '291 Oakwood St', 8192749028, 'gestionnaire', '987654333'),
('136259', 'William Walker', '157 Pinecrest Ave', 8192749029, 'gardien', '987654334'),
('136260', 'Sophia King', '369 Cedarwood Ln', 8192749030, 'femme de chambre', '987654335'),
('136261', 'Anthony Wright', '478 Sprucewood Pl', 8192749031, 'concierge', '987654336'),
('136262', 'Olivia Scott', '592 Birchwood Rd', 8192749032, 'barman', '987654337'),
('136263', 'Thomas Moore', '631 Chestnutwood St', 8192749033, 'réceptionniste', '987654338'),
('136264', 'Charlotte Miller', '774 Walnutwood Ave', 8192749034, 'serveur', '987654339'),
('136265', 'Daniel Taylor', '917 Elmwood Ln', 8192749035, 'cuistot', '987654340'),
('136266', 'Sean Cahill', '156 Maplewood Blvd', 8192749036, 'gestionnaire', '987654341'),
('136267', 'Matthew Thomas', '238 Oakwood Rd', 8192749037, 'gardien', '987654342'),
('136268', 'Mia Jackson', '379 Pinecrest St', 8192749038, 'femme de chambre', '987654343'),
('136269', 'Samuel White', '491 Cedarwood Dr', 8192749039, 'concierge', '987654344'),
('136270', 'Grace Harris', '534 Sprucewood Ln', 8192749040, 'barman', '987654345'),
('136271', 'Joseph Martinez', '678 Birchwood Ave', 8192749041, 'réceptionniste', '987654346'),
('136272', 'Isabella Martin', '821 Chestnutwood Pl', 8192749042, 'serveur', '987654347'),
('136273', 'Christopher Lee', '964 Walnutwood St', 8192749043, 'cuistot', '987654348'),
('136274', 'Ava Hessington', '103 Elmwood Blvd', 8192749044, 'gestionnaire', '987654349'),
('136275', 'Ethan Allen', '147 Maplewood Rd', 8192749045, 'gardien', '987654350'),
('136276', 'Evelyn Young', '203 Oakwood St', 8192749046, 'femme de chambre', '987654351'),
('136277', 'Alexander Johnson', '246 Pinecrest Dr', 8192749047, 'concierge', '987654352'),
('136278', 'Abigail Clark', '289 Cedarwood Ln', 8192749048, 'barman', '987654353'),
('136279', 'Nicholas Davis', '332 Sprucewood Pl', 8192749049, 'réceptionniste', '987654354'),
('136280', 'Elizabeth Wilson', '375 Birchwood Ave', 8192749050, 'serveur', '987654355'),
('136281', 'Andrew Roberts', '418 Chestnutwood St', 8192749051, 'cuistot', '987654356'),
('136282', 'Trevor Evans', '461 Walnutwood Rd', 8192749052, 'gestionnaire', '987654357'),
('136283', 'Lucas Wright', '504 Elmwood Ave', 8192749053, 'gardien', '987654358'),
('136284', 'Madison Perry', '547 Maplewood Ln', 8192749054, 'femme de chambre', '987654359'),
('136285', 'Aiden Thompson', '590 Oakwood Blvd', 8192749055, 'concierge', '987654360');

INSERT INTO travaille_pour(hotel_id, employe_id)
VALUES
('h001', '136247'),
('h001', '136248'),
('h001', '136249'),
('h002', '136251'),
('h002', '136252'),
('h003', '136253'),
('h003', '136254'),
('h003', '136255'),
('h004', '136256'),
('h004', '136257'),
('h005', '136259'),
('h005', '136260'),
('h005', '136261'),
('h006', '136262'),
('h006', '136263'),
('h006', '136264'),
('h007', '136265'),
('h007', '136267'),
('h008', '136268'),
('h008', '136269'),
('h008', '136270'),
('h009', '136271'),
('h009', '136272'),
('h009', '136273'),
('h010', '136275'),
('h010', '136276'),
('h011', '136277'),
('h011', '136278'),
('h011', '136279'),
('h012', '136280'),
('h012', '136281'),
('h013', '136283'),
('h013', '136284'),
('h013', '136285'),
('h014', '136266');

INSERT INTO archives(archives_id, date_debut, date_fin)
VALUES
('124375446', '01/05/2023', '15/05/2023'),
('124375447', '16/04/2023', '31/04/2023'),
('124375448', '01/07/2023', '15/07/2023'),
('124375449', '16/08/2023', '30/08/2023'),
('124375450', '01/11/2023', '15/11/2023');

INSERT INTO client(client_id, Nom, adresse, nas, telephone, date_enregistrement)
VALUES
('431455', 'John Doe', 'johndoe@gmail.com', '345098325', 5144567810, '01/05/2023'),
('431456', 'Jane Smith', 'janesmith@gmail.com', '345098326', 5144567811, '16/04/2023'),
('431457', 'Michael Johnson', 'michaeljohnson@gmail.com', '345098327', 5144567812, '01/07/2023'),
('431458', 'Emily Davis', 'emilydavis@gmail.com', '345098328', 5144567813, '16/08/2023'),
('431459', 'David Wilson', 'davidwilson@gmail.com', '345098329', 5144567814, '01/11/2023');

INSERT INTO reservation(reservation_id, date_reservation, employe_id, client_id, archive_id, chambre_id)
VALUES
('124375464', '01/05/2023', '136263', '431455', '124375446', 'room015'),
('124375474', '12/04/2023', '136255', '431456', '124375447', 'room016'),
('124375484', '03/05/2023', '136279', '431457', '124375448', 'room017'),
('124375494', '24/06/2023', '136271', '431458', '124375449', 'room018'),
('124375404', '05/10/2023', '136263', '431459', '124375450', 'room019');

INSERT INTO location(location_id, date_location, montant, employe_id, client_id, reservation_id, chambre_id, archives_id)
VALUES
('342543', '01/05/2023', 1000, '136263', '431455', '124375464', 'room015', '124375446'),
('342544', '16/04/2023', 1200, '136255', '431456', '124375474', 'room015', '124375447'),
('342545', '01/07/2023', 800, '136279', '431457', '124375484', 'room015', '124375448'),
('342546', '16/08/2023', 700, '136271', '431458', '124375494', 'room015', '124375449'),
('342547', '01/11/2023', 1900, '136263', '431459', '124375404', 'room015', '124375450');