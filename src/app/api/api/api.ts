export * from './auth.service';
import { AuthService } from './auth.service';
export * from './event.service';
import { EventService } from './event.service';
export * from './inscripcion.service';
import { InscripcionService } from './inscripcion.service';
export * from './usuario.service';
import { UsuarioService } from './usuario.service';
export const APIS = [AuthService, EventService, InscripcionService, UsuarioService];
