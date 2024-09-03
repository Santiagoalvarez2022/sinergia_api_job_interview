from transformers import GPT2Tokenizer, GPT2LMHeadModel, Trainer, TrainingArguments
import torch

# Cargar el modelo preentrenado
model_name = "gpt-4"  # Usa el modelo adecuado
model = GPT2LMHeadModel.from_pretrained(model_name)
tokenizer = GPT2Tokenizer.from_pretrained(model_name)

# Datos de entrenamiento (ejemplo simplificado)
train_data = [
    {"input": "Actúa como un entrevistador. Pregunta sobre experiencia laboral.", "output": "¿Puedes describir un proyecto desafiante en el que trabajaste en tu último empleo?"},
    {"input": "Actúa como un entrevistador. Pregunta sobre formación académica.", "output": "¿Qué título obtuviste en tu educación superior?"}
]

# Preparar los datos para el entrenamiento
train_encodings = tokenizer([d['input'] for d in train_data], truncation=True, padding=True, max_length=128)
labels = tokenizer([d['output'] for d in train_data], truncation=True, padding=True, max_length=128)

class InterviewDataset(torch.utils.data.Dataset):
    def __init__(self, encodings, labels):
        self.encodings = encodings
        self.labels = labels

    def __getitem__(self, idx):
        item = {key: torch.tensor(val[idx]) for key, val in self.encodings.items()}
        item['labels'] = torch.tensor(self.labels['input_ids'][idx])
        return item

    def __len__(self):
        return len(self.labels['input_ids'])

train_dataset = InterviewDataset(train_encodings, labels)

# Configurar los argumentos de entrenamiento
training_args = TrainingArguments(
    output_dir='./results',
    num_train_epochs=3,
    per_device_train_batch_size=2,
    save_steps=10_000,
    save_total_limit=2,
)

# Inicializar el entrenador
trainer = Trainer(
    model=model,
    args=training_args,
    train_dataset=train_dataset
)

# Entrenar el modelo
trainer.train()

# Guardar el modelo afinado
model.save_pretrained('./interview-coach-model')
tokenizer.save_pretrained('./interview-coach-model')