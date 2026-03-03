/*
  # Corregir Políticas RLS para tabla leads

  1. Cambios de Seguridad
    - Remover política INSERT con validación siempre verdadera
    - Agregar política INSERT restrictiva que valida campos requeridos
    - Mantener política SELECT para usuarios autenticados
    
  2. Validaciones
    - Asegurar que email tenga formato válido
    - Asegurar que teléfono no esté vacío
    - Asegurar que descripción del caso no esté vacía
*/

DO $$
BEGIN
  DROP POLICY IF EXISTS "Permitir inserción pública de leads" ON leads;
END $$;

CREATE POLICY "Permitir inserción pública de leads con validación"
  ON leads
  FOR INSERT
  TO anon
  WITH CHECK (
    email IS NOT NULL 
    AND email ~ '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$'
    AND full_name IS NOT NULL
    AND full_name != ''
    AND phone IS NOT NULL
    AND phone != ''
    AND country IS NOT NULL
    AND country != ''
    AND service IS NOT NULL
    AND service != ''
    AND applied_before IN ('si', 'no')
    AND case_description IS NOT NULL
    AND case_description != ''
  );