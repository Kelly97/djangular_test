## PASOS DE INSTALACIÓN
### Ejecute los siguientes comandos

#### 1. Creación y activación de ambiente virtual
```
python -m venv venv
venv/Scripts/activate 
```

#### 2. instalación de requerimientos
```
pip install -r requirements.txt
```

#### 3. Creación y ejecución de migraciones
```
python manage.py makemigrations
python manage.py migrate
```

#### 4. Levantar servidor
```
python manage.py runserver  
```

## COMANDOS ADICIONALES
### Creación de archivo para instalar dependencias
```
python -m pip freeze > requirements.txt
```
### Instalación de dependencias
```
pip install -r requirements.txt
```
### Crear superusuario
```
python manage.py createsuperuser
```

