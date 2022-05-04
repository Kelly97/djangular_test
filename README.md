# PASOS DE INSTALACIÓN
## Ejecute los siguientes comandos

### Creación y activación de ambiente virtual
```
python -m venv venv
venv/Scripts/activate 
```

### instalación de requerimientos
```
pip install -r requirements.txt
```

### Creación y ejecución de migraciones
```
python manage.py makemigrations
python manage.py migrate
```

### Levantar servidor
```
python manage.py runserver  
```

# COMANDOS ADICIONALES
## Creación de archivo para instalar dependencias
```
python -m pip freeze > requirements.txt
```
## Instalación de dependencias
```
pip install -r requirements.txt
```
