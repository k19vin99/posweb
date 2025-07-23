-- Insertar dirección de prueba asociada
INSERT INTO address (region, comuna, poblacion_villa, calle, numero, direccion_google)
VALUES ('Metropolitana', 'Santiago', 'Centro', 'Calle Admin', '100', 'Calle Admin 100, Centro, Santiago, Metropolitana')
RETURNING id;


INSERT INTO users 
(username, password, primer_nombre, segundo_nombre, primer_apellido, segundo_apellido, genero, email, direccion_id, role, company_id, store_id)
VALUES 
('admin', '$2b$10$HRU3ckCR5hL.WPY.fEBhu.Q55Ijqzech7odeJwuRrM.pojeYJRR/W', 'Admin', '', 'POSWEB', '', 'M', 'admin@posweb.cl', 1, 'admin', NULL, NULL);