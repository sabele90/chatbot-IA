import showdown from "showdown";
import hljs from "highlight.js";
import "highlight.js/styles/github.css"; 

const converter = new showdown.Converter({
  tables: true, // Habilita tablas
  simplifiedAutoLink: true, // Convierte URLs automáticamente
  strikethrough: true, // ~~tachado~~
  tasklists: true, // Listas de tareas [ ] y [x]
  ghCompatibleHeaderId: true, // Encabezados compatibles con GitHub
  underline: true, // __subrayado__
  emoji: true, // Emojis :smile:
});

/**
 * Convierte datos JSON en una tabla Markdown.
 * @param data - Array de objetos JSON
 * @returns Tabla en formato Markdown.
 */
function generateTableMarkdown(data: Record<string, any>[]): string {
  if (!data.length) return "No hay datos disponibles.";

  const headers = Object.keys(data[0]);
  const headerRow = `| ${headers.join(" | ")} |`;
  const separatorRow = `| ${headers.map(() => "---").join(" | ")} |`;

  const rows = data
    .map((row) => `| ${headers.map((header) => row[header] ?? "").join(" | ")} |`)
    .join("\n");

  return `${headerRow}\n${separatorRow}\n${rows}`;
}

/**
 * Preprocesa texto para convertir listas implícitas en listas Markdown.
 * @param content - Texto que podría contener listas.
 * @returns Texto con listas en formato Markdown.
 */
function listMarkdown(content: string): string {
    const lines = content.split("\n");
  
    // Identificar si el texto contiene enumeraciones o solo un párrafo
    const isEnumeration = lines.length > 1 && lines.every((line) => line.trim());
  
    if (!isEnumeration) {
      // Si no es una enumeración, devolver el texto sin modificar
      return content;
    }
  
    // Procesar líneas como lista solo si representan enumeraciones
    const processedLines = lines.map((line) => {
      if (!line.startsWith("-") && !line.match(/^\d+\./)) {
        return `- ${line.trim()}`;
      }
      return line;
    });
  
    return processedLines.join("\n");
  }
  

/**
 * Procesa Markdown y valida formatos comunes.
 * - Convierte arreglos JSON a tablas Markdown.
 * - Convierte listas implícitas en Markdown.
 * @param content - Texto o datos JSON.
 * @returns Contenido procesado en HTML.
 */

/**
 * Función para aplicar el resaltado de sintaxis con Highlight.js.
 * @param html - Contenido HTML a procesar
 * @returns HTML con resaltado de sintaxis
 */
function applySyntaxHighlighting(html: string): string {
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = html;
  
    // Buscar y resaltar bloques de código
    tempDiv.querySelectorAll("pre code").forEach((block) => {
      hljs.highlightElement(block as HTMLElement);
    });
  
    return tempDiv.innerHTML;
  }
function processMarkdown(content: string | Record<string, any>[]): string {
  if (Array.isArray(content)) {
    // Si el contenido es un arreglo, procesarlo como tabla Markdown.
    const tableMarkdown = generateTableMarkdown(content);
    return applySyntaxHighlighting(converter.makeHtml(tableMarkdown));
  }

  // Si es texto, preprocesar listas implícitas y luego convertir a HTML.
  const preprocessedContent = listMarkdown(content);
  return applySyntaxHighlighting(converter.makeHtml(preprocessedContent));
}

export default {
  install(app: any) {
    app.config.globalProperties.$markdownToHtml = (markdown: string | Record<string, any>[]) =>
      processMarkdown(markdown);
  },
};
