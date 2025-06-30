import { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import modulesConfig from './modules.config.json';
import { marked } from 'marked';

// CSS global para quitar márgenes y paddings de body/html
document.body.style.margin = '0';
document.body.style.padding = '0';
document.documentElement.style.margin = '0';
document.documentElement.style.padding = '0';

document.body.style.height = '100vh';
document.body.style.width = '100vw';
document.documentElement.style.height = '100vh';
document.documentElement.style.width = '100vw';

const RESOURCE_PATH = '/resources/';

function App() {
  
  const [currentModule, setCurrentModule] = useState(modulesConfig[0].id);
  const [currentSub, setCurrentSub] = useState<string | null>(null);
  const [currentSection, setCurrentSection] = useState<string | null>(null);
  const [content, setContent] = useState('');
  const [resources, setResources] = useState<string[]>([]);

  // Función para seleccionar sección (solo actualiza el estado)
  const handleSelectSection = (subId: string | null, sectionIdx: number | null) => {
    if (subId === null || sectionIdx === null) {
      setCurrentSection(null);
    } else {
      setCurrentSection(`${subId}__${sectionIdx}`);
    }
  };

  // Cuando se selecciona un módulo, limpiar submódulo y sección
  useEffect(() => {
    setCurrentSub(null);
    setCurrentSection(null);
  }, [currentModule]);

  useEffect(() => {
    const modIdx = modulesConfig.findIndex(m => m.id === currentModule) + 1;
    const mod = modulesConfig.find(m => m.id === currentModule);
    if (!mod) return;
    const subIdx = currentSub ? mod.subsections.findIndex((s: any) => s.id === currentSub) + 1 : -1;
    const sub = currentSub ? mod.subsections.find((s: any) => s.id === currentSub) : null;
    let fileName = '';
    // Si hay apartado seleccionado
    if (currentSection && sub) {
      const [, idx] = currentSection.split('__');
      const secIdx = parseInt(idx, 10) + 1;
      if (!isNaN(secIdx)) {
        fileName = `mod-${String(modIdx).padStart(2, '0')}-${String(subIdx).padStart(2, '0')}-${String(secIdx).padStart(2, '0')}.md`;
      }
      setResources(sub && sub.resources ? sub.resources : []);
    } else if (subIdx > 0 && currentSub) {
      fileName = `mod-${String(modIdx).padStart(2, '0')}-${String(subIdx).padStart(2, '0')}.md`;
      setResources(sub && sub.resources ? sub.resources : []);
    } else {
      // Solo módulo seleccionado
      fileName = mod.content || `mod-${String(modIdx).padStart(2, '0')}.md`;
      setResources([]);
    }
    (async () => {
      try {
        const res = await fetch(`/src/modules/${fileName}`);
        if (!res.ok) {
          setContent('<div style="color:#b00">No se ha encontrado el archivo de contenido.</div>');
          return;
        }
        const md = await res.text();
        const html = await marked(md);
        setContent(html);
      } catch (e) {
        setContent('<div style="color:#b00">Error al cargar el archivo de contenido.</div>');
      }
    })();
  }, [currentModule, currentSub, currentSection]);

  return (
    <div style={{ width: '100vw', height: '100vh', fontFamily: 'sans-serif', margin: 0, padding: 0, boxSizing: 'border-box', position: 'fixed', top: 0, left: 0, display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'flex', flex: 1, height: 'calc(100vh - 0px)' }}>
        <Sidebar
          modules={modulesConfig}
          current={currentModule}
          currentSub={currentSub}
          currentSection={currentSection}
          onSelectModule={setCurrentModule}
          onSelectSub={setCurrentSub}
          onSelectSection={handleSelectSection}
          
        />
        <main style={{ flex: 1, padding: 0, overflowY: 'auto', background: '#f5f7fa', width: '100%', height: '100%', boxSizing: 'border-box', display: 'flex', alignItems: 'flex-start', justifyContent: 'flex-start' }}>
          <div style={{ width: '100%', height: '100%', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'flex-start' }}>
            <div style={{ width: '100%', padding: '32px 24px 0 24px', boxSizing: 'border-box' }}>
              <div style={{ fontWeight: 700, fontSize: 26, marginBottom: 8, marginTop: 18, color: '#223', textAlign: 'left' }}>
  {(() => {
    const mod = modulesConfig.find(m => m.id === currentModule);
    if (!mod) return '';
    const sub = mod.subsections.find((s: any) => s.id === currentSub);
    if (currentSection && sub) {
      const [, idx] = currentSection.split('__');
      const idxNum = parseInt(idx, 10);
      if (sub.sections && !isNaN(idxNum) && sub.sections[idxNum]) {
        return sub.sections[idxNum].title;
      }
    }
    if (sub && sub.label && sub.label.es) return sub.label.es;
    return mod.label.es;
  })()}
</div>
<div style={{ fontSize: 16, color: '#888', marginBottom: 18, textAlign: 'left' }}>
  {(() => {
    const pad = (n: number) => n.toString().padStart(2, '0');
    const modIdx = modulesConfig.findIndex(m => m.id === currentModule) + 1;
    if (modIdx < 1) return '';
    const subIdx = (() => {
      const mod = modulesConfig.find(m => m.id === currentModule);
      if (!mod) return -1;
      return mod.subsections.findIndex((s: any) => s.id === currentSub) + 1;
    })();
    if (currentSection) {
      const [subId, idx] = currentSection.split('__');
      const idxNum = parseInt(idx, 10) + 1;
      if (subIdx > 0 && !isNaN(idxNum)) {
        return `Archivo: mod-${pad(modIdx)}-${pad(subIdx)}-${pad(idxNum)}.md`;
      }
    }
    if (subIdx > 0 && currentSub) {
      return `Archivo: mod-${pad(modIdx)}-${pad(subIdx)}.md`;
    }
    return `Archivo: mod-${pad(modIdx)}.md`;
  })()}
</div>
<div dangerouslySetInnerHTML={{ __html: content }} />
              {resources.length > 0 && (
                <div style={{ marginTop: 32 }}>
                  <h3>Recursos asociados</h3>
                  <ul>
                    {resources.map(file => (
                      <li key={file}>
                        <a href={RESOURCE_PATH + file} target="_blank" rel="noopener noreferrer">{file}</a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;