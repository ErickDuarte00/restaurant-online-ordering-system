import csv
from pathlib import Path
from django.core.management.base import BaseCommand
from menu.models import MenuItem, Size

class Command(BaseCommand):
    help = 'Populates the database with initial menu items from menu_items.csv'

    def handle(self, *args, **options):
        if MenuItem.objects.exists():
            self.stdout.write(self.style.SUCCESS('Menu items already exist in database.'))
            return

        csv_path = Path(__file__).resolve().parent.parent.parent / 'menu_items.csv'
        if not csv_path.exists():
            self.stdout.write(self.style.ERROR(f'File not found: {csv_path}'))
            return

        with open(csv_path, mode='r', encoding='utf-8') as f:
            reader = csv.reader(f)
            header = next(reader, None)
            
            created_count = 0
            for row in reader:
                if not row or not any(row):
                    continue
                
                name = row[0].strip()
                category = row[1].strip()
                item_type = row[2].strip()
                img_alt = row[3].strip() if len(row) > 3 else ''
                img_src = row[4].strip() if len(row) > 4 else ''

                menu_item = MenuItem.objects.create(
                    name=name,
                    category=category,
                    type=item_type,
                    imgAlt=img_alt,
                    imgSrc=img_src
                )

                # Process sizes: index 5 onwards in groups of 3 (size_name, price, description)
                size_data = row[5:]
                for i in range(0, len(size_data), 3):
                    size_name = size_data[i].strip() if i < len(size_data) else ''
                    price_str = size_data[i+1].strip() if i+1 < len(size_data) else ''
                    description = size_data[i+2].strip() if i+2 < len(size_data) else ''

                    if size_name and price_str:
                        try:
                            price = float(price_str)
                            Size.objects.create(
                                menuItem=menu_item,
                                name=size_name,
                                price=price,
                                description=description
                            )
                        except ValueError:
                            pass

                created_count += 1

        self.stdout.write(self.style.SUCCESS(f'Successfully seeded {created_count} menu items!'))

