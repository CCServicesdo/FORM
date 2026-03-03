/*
  # Crear tabla de leads para CCServices

  1. Nueva Tabla
    - `leads`
      - `id` (uuid, clave primaria)
      - `full_name` (text, nombre completo del prospecto)
      - `email` (text, correo electrónico)
      - `country` (text, país de residencia)
      - `phone` (text, número de WhatsApp)
      - `service` (text, tipo de trámite de interés)
      - `applied_before` (text, si ha aplicado anteriormente: 'si' o 'no')
      - `case_description` (text, descripción del caso)
      - `created_at` (timestamptz, fecha de creación)

  2. Seguridad
    - Habilitar RLS en la tabla `leads`
    - Permitir que usuarios anónimos inserten datos (solo INSERT)
    - Los datos solo pueden ser leídos por usuarios autenticados (administradores)
*/

CREATE TABLE IF NOT EXISTS leads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name text NOT NULL,
  email text NOT NULL,
  country text NOT NULL,
  phone text NOT NULL,
  service text NOT NULL,
  applied_before text NOT NULL,
  case_description text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Permitir inserción pública de leads"
  ON leads
  FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Solo usuarios autenticados pueden leer leads"
  ON leads
  FOR SELECT
  TO authenticated
  USING (true);