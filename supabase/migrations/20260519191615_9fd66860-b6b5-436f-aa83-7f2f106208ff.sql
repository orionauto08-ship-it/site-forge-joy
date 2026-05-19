CREATE TYPE public.part_stock AS ENUM ('in_stock', 'on_order');

CREATE TABLE public.parts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  category text NOT NULL DEFAULT 'Без категории',
  brand text NOT NULL DEFAULT '—',
  title text NOT NULL,
  oem text NOT NULL DEFAULT '',
  oem_eng text,
  fits text NOT NULL DEFAULT '',
  price numeric,
  stock public.part_stock NOT NULL DEFAULT 'on_order',
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX parts_sort_idx ON public.parts (sort_order, id);
CREATE INDEX parts_brand_idx ON public.parts (brand);
CREATE INDEX parts_category_idx ON public.parts (category);

ALTER TABLE public.parts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read parts"
  ON public.parts FOR SELECT
  USING (true);

CREATE POLICY "Admins and managers can insert parts"
  ON public.parts FOR INSERT
  TO authenticated
  WITH CHECK (has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'manager'::app_role));

CREATE POLICY "Admins and managers can update parts"
  ON public.parts FOR UPDATE
  TO authenticated
  USING (has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'manager'::app_role));

CREATE POLICY "Admins and managers can delete parts"
  ON public.parts FOR DELETE
  TO authenticated
  USING (has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'manager'::app_role));

CREATE OR REPLACE FUNCTION public.parts_set_updated_at()
RETURNS trigger
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

CREATE TRIGGER parts_updated_at
BEFORE UPDATE ON public.parts
FOR EACH ROW EXECUTE FUNCTION public.parts_set_updated_at();