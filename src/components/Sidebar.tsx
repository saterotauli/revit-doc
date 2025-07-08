import React, { useState, useRef, useEffect } from 'react';

type SidebarProps = {
  modules: any[];
  current: string;
  currentSub: string | null;
  currentSection: string | null;
  onSelectModule: (id: string) => void;
  onSelectSub: (id: string | null) => void;
  onSelectSection: (subId: string | null, sectionIdx: number | null) => void;
};

const Sidebar: React.FC<SidebarProps> = ({
  modules,
  current,
  currentSub,
  currentSection,
  onSelectModule,
  onSelectSub,
  onSelectSection
}) => {
  const [openModule, setOpenModule] = useState<string | null>(current);
  const [openSubs, setOpenSubs] = useState<{ [moduleId: string]: string | null }>({});
  const [sectionHeights, setSectionHeights] = useState<{ [subId: string]: number }>({});
  const [moduleHeights, setModuleHeights] = useState<{ [moduleId: string]: number }>({});
  const subRefs = useRef<{ [subId: string]: HTMLDivElement | null }>({});
  const moduleRefs = useRef<{ [moduleId: string]: HTMLDivElement | null }>({});

  useEffect(() => {
    Object.keys(subRefs.current).forEach(subId => {
      const el = subRefs.current[subId];
      if (el) {
        setSectionHeights((prevHeights: { [subId: string]: number }) => ({
          ...prevHeights,
          [subId]: el.scrollHeight
        }));
      }
    });
    Object.keys(moduleRefs.current).forEach(moduleId => {
      const el = moduleRefs.current[moduleId];
      if (el) {
        setModuleHeights((prevHeights: { [moduleId: string]: number }) => ({
          ...prevHeights,
          [moduleId]: el.scrollHeight
        }));
      }
    });
  }, [openModule, modules]);

  // Mantener sincronizado el módulo abierto con el actual
  if (openModule !== current) setOpenModule(current);

  const handleSubClick = (modId: string, subId: string) => {
    setOpenSubs((prev: { [moduleId: string]: string | null }) => ({
      ...prev,
      [modId]: prev[modId] === subId ? null : subId
    }));
    onSelectSub(subId);
  };

  return (
    <aside style={{ width: 350, background: '#5c6c87', color: '#fff', height: '100vh', padding: 0, display: 'flex', flexDirection: 'column' }}>
      <div style={{ padding: 24, borderBottom: '1px solid #444', background: '#232f3e', boxShadow: '0 4px 12px 0 rgba(0,0,0,0.07)', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
  <img src={import.meta.env.BASE_URL + 'images/logo_pixel51_atc_acc.png'} alt="Logo Revit MEP" style={{ maxHeight: 36, maxWidth: '70%', height: 'auto', width: 'auto', display: 'block', margin: '0 auto 12px auto' }} />
  <div style={{
    fontWeight: 700,
    color: '#fff',
    fontSize: 25,
    marginTop: 18,
    marginBottom: 4,
    letterSpacing: 1,
    textAlign: 'center',
    textTransform: 'uppercase',
    lineHeight: 1.1
  }}>
    CURSO DE AUTODESK REVIT MEP
  </div>
</div>
      <nav style={{ flex: 1, overflowY: 'auto' }}>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
          {modules.map((m, mIdx) => (
            <li key={m.id}>
              {mIdx === 0 && (
                <div style={{ height: 2, background: '#a0a6b8', width: '100%' }} />
              )}
              <button
                style={{
                  width: '100%',
                  background: current === m.id ? '#1976d2' : 'transparent',
                  color: '#fff',
                  border: 'none',
                  textAlign: 'left',
                  padding: '12px 18px',
                  cursor: 'pointer',
                  fontWeight: current === m.id ? 'bold' : 'normal',
                  outline: 'none',
                  letterSpacing: '0.5px',
                  fontSize: '15px',
                }}
                onClick={() => {
                  onSelectModule(m.id);
                  onSelectSub(null);
                  onSelectSection(null, null);
                  setOpenModule(m.id);
                }}
              >
                {m.label.es.toUpperCase()}
              </button>
              {/* Submódulos */}
              <div
                style={{
                  overflow: 'hidden',
                  transition: 'max-height 1s cubic-bezier(0.4,0,0.2,1)',
                  maxHeight: openModule === m.id && m.subsections ? (moduleHeights[m.id] ? moduleHeights[m.id] + 'px' : '1200px') : '0px',
                  background: 'transparent'
                }}
              >
                {openModule === m.id && m.subsections && (
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                    {m.subsections.map((sub: any) => (
                      <li key={sub.id}>
                        <button
                          style={{
                            width: '100%',
                            background: currentSub === sub.id ? '#bbdefb' : '#e3f2fd',
                            color: currentSub === sub.id ? '#0d223a' : '#1565c0',
                            border: 'none',
                            textAlign: 'left',
                            padding: '8px 32px',
                            cursor: 'pointer',
                            fontWeight: currentSub === sub.id ? 'bold' : 'normal',
                            outline: 'none',
                            borderLeft: currentSub === sub.id ? '5px solid #1976d2' : '5px solid transparent',
                            fontSize: '14px',
                            marginBottom: 0
                          }}
                          onClick={() => handleSubClick(m.id, sub.id)}
                        >
                          {sub.label.es}
                        </button>
                        {/* Apartados (tercer nivel) */}
                        <div
                          style={{
                            overflow: 'hidden',
                            transition: 'max-height 1s cubic-bezier(0.4,0,0.2,1)',
                            maxHeight: openSubs[m.id] === sub.id && sub.sections ? (sub.sections && sectionHeights[sub.id] ? sectionHeights[sub.id] : '1200px') : '0px',
                            background: 'transparent'
                          }}
                          ref={el => { subRefs.current[sub.id] = el; }}
                        >
                          {openSubs[m.id] === sub.id && sub.sections && (
                            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                              {sub.sections.map((sec: any, idx: number) => (
                                <li key={sec.title} style={{ margin: 0, padding: 0 }}>
                                  <button
                                    style={{
                                      width: '100%',
                                      display: 'flex',
                                      alignItems: 'center',
                                      gap: '8px',
                                      textAlign: 'left',
                                      background: currentSection === `${sub.id}__${idx}` ? '#ffe082' : '#fff',
                                      color: currentSection === `${sub.id}__${idx}` ? '#2d2100' : '#3a4252',
                                      border: 'none',
                                      outline: 'none',
                                      cursor: 'pointer',
                                      padding: '12px 40px 12px 40px',
                                      fontWeight: currentSection === `${sub.id}__${idx}` ? 'bold' : 'normal',
                                      fontSize: '13px',
                                      borderLeft: currentSection === `${sub.id}__${idx}` ? '3px solid #1976d2' : '3px solid transparent',
                                      transition: 'background 0.2s, color 0.2s',
                                    }}
                                    onClick={() => onSelectSection(sub.id, idx)}
                                  >
                                    <span style={{ display: 'inline-block', fontSize: '13px', color: currentSection === `${sub.id}__${idx}` ? '#1976d2' : '#b8c2cc' }}>•</span>
                                    <span>{sec.title}</span>
                                  </button>
                                  {idx < sub.sections.length - 1 && (
                                    <div style={{ height: 2, background: '#a0a6b8', width: '100%' }} />
                                  )}
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>
                      {m.subsections && m.subsections.length > 1 && m.subsections[m.subsections.length - 1].id !== sub.id && (
                        <div style={{ height: 2, background: '#a0a6b8', width: '100%' }} />
                      )}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              {/* Línea divisoria bajo módulo */}
              {mIdx < modules.length - 1 && (
                <div style={{ height: 2, background: '#a0a6b8', width: '100%' }} />
              )}
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;