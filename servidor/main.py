from fastapi import FastAPI, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field, validator
import openai
import json
import os
from typing import Literal, List
from dotenv import load_dotenv

# Cargar variables de entorno
load_dotenv()
openai.api_key = os.getenv("OPEN_AI_KEY")

# Directorio para almacenar historiales
HISTORY_DIR = "data/histories/"
os.makedirs(HISTORY_DIR, exist_ok=True)  # Crear el directorio si no existe

app = FastAPI()
origins = [
    "http://localhost:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Modelo para la solicitud de chat
class ChatRequest(BaseModel):
    user_id: str  # Identificador único del usuario
    prompt: str 
    max_length: int = Field(..., ge=200, le=600)
    temperature: Literal["baja", "media", "alta"]

# Función para convertir "baja", "media", "alta" en valores numéricos
def get_temperature_value(temperature: str) -> float:
    mapping = {"baja": 0.2, "media": 0.7, "alta": 1.0}
    return mapping.get(temperature, 0.7)

# Ruta GET: obtener historial
@app.get("/")
def read_root():
    return {"message": "¡Bienvenido a mi FastAPI!"}
@app.get("/history", response_model=List[dict])
def get_history(user_id: str = Query(..., description="Identificador único del usuario")):
    history_file = os.path.join(HISTORY_DIR, f"history_{user_id}.json")
    if os.path.exists(history_file):
        # Leer historial del archivo JSON
        with open(history_file, "r") as file:
            return json.load(file)
    else:
        return {"message": f"No existe historial para el usuario {user_id}. Se creará al enviar el primer mensaje."}

# Ruta POST: enviar pregunta y obtener respuesta
@app.post("/chat")
def chat(request: ChatRequest):
    try:
        # Determinar el archivo de historial del usuario
        history_file = os.path.join(HISTORY_DIR, f"history_{request.user_id}.json")
        
        # Leer el historial existente o inicializarlo
        if os.path.exists(history_file):
            with open(history_file, "r", encoding="utf-8") as file:
                history = json.load(file)
        else:
            history = []

        # Construir el contexto de mensajes basado en el historial
        messages = [{"role": "system", "content": "Eres un asistente útil."}]
        for entry in history:
            messages.append({"role": "user", "content": entry["prompt"]})
            messages.append({"role": "assistant", "content": entry["response"]})

        # Agregar el nuevo mensaje del usuario al contexto
        messages.append({"role": "user", "content": request.prompt})

        # Obtener el valor numérico de la temperatura
        temperature_value = get_temperature_value(request.temperature)

        # Llamada a la API de OpenAI con contexto
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=messages,
            max_tokens=request.max_length,
            temperature=temperature_value,
        )

        # Extraer el texto generado por OpenAI
        generated_text = response['choices'][0]['message']['content']

        # Crear una nueva entrada en el historial
        new_entry = {
            "prompt": request.prompt,
            "response": generated_text,
            "max_length": request.max_length,
            "temperature": request.temperature,
        }

        # Añadir la nueva entrada al historial
        history.append(new_entry)

        # Guardar el historial actualizado
        with open(history_file, "w", encoding="utf-8") as file:
            json.dump(history, file, indent=4, ensure_ascii=False)

        # Devolver la respuesta y el historial
        return {"response": generated_text, "history": history}

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
