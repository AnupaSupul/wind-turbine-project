import os

os.makedirs('docs/assets/diagrams', exist_ok=True)

def generate_svg(filename, width, height, elements):
    svg = f"""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {width} {height}" width="100%" height="100%">
    <defs>
        <filter id="shadow" x="-5%" y="-5%" width="110%" height="110%">
            <feDropShadow dx="0" dy="4" stdDeviation="6" flood-opacity="0.05" />
        </filter>
        <linearGradient id="grad-blue" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stop-color="#ebf4ff"/>
            <stop offset="100%" stop-color="#dbeafe"/>
        </linearGradient>
        <linearGradient id="grad-green" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stop-color="#f0fdf4"/>
            <stop offset="100%" stop-color="#dcfce7"/>
        </linearGradient>
        <linearGradient id="grad-purple" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stop-color="#faf5ff"/>
            <stop offset="100%" stop-color="#f3e8ff"/>
        </linearGradient>
        <linearGradient id="grad-amber" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stop-color="#fffbeb"/>
            <stop offset="100%" stop-color="#fef3c7"/>
        </linearGradient>
        <linearGradient id="grad-gray" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stop-color="#f8fafc"/>
            <stop offset="100%" stop-color="#f1f5f9"/>
        </linearGradient>
    </defs>
    <style>
        .title {{ font-family: -apple-system, system-ui, sans-serif; font-size: 16px; font-weight: 700; fill: #1e293b; text-anchor: middle; }}
        .subtitle {{ font-family: -apple-system, system-ui, sans-serif; font-size: 12px; fill: #64748b; text-anchor: middle; }}
        .text-left {{ text-anchor: start; }}
        .label {{ font-family: -apple-system, system-ui, sans-serif; font-size: 13px; font-weight: 500; fill: #475569; text-anchor: middle; }}
        .sublabel {{ font-family: -apple-system, system-ui, sans-serif; font-size: 11px; fill: #94a3b8; text-anchor: middle; }}
        path {{ stroke: #94a3b8; stroke-width: 2; fill: none; }}
        .arrow {{ stroke: #94a3b8; stroke-width: 2; fill: none; marker-end: url(#arrowhead); }}
        .animated-arrow {{ stroke: #3b82f6; stroke-width: 2; stroke-dasharray: 4; animation: dash 1s linear infinite; }}
    </style>
    <defs>
        <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
            <polygon points="0 0, 10 3.5, 0 7" fill="#94a3b8" />
        </marker>
    </defs>
    <rect width="{width}" height="{height}" fill="#ffffff" rx="12" />
    """
    svg += elements
    svg += "</svg>"
    
    with open(f"docs/assets/diagrams/{filename}.svg", "w", encoding="utf-8") as f:
        f.write(svg)

def box(x, y, w, h, title, subtitle="", color="gray", icon=""):
    cx = x + w/2
    cy = y + h/2 - (6 if subtitle else 0)
    
    res = f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="8" fill="url(#grad-{color})" stroke="#{color}-border" stroke-width="1.5" filter="url(#shadow)" />\n'
    # Use generic border colors
    borders = {'blue': 'bfdbfe', 'green': 'bbf7d0', 'purple': 'e9d5ff', 'amber': 'fde68a', 'gray': 'e2e8f0'}
    res = res.replace(f"#{color}-border", f"#{borders.get(color, 'e2e8f0')}")
    
    if icon:
        res += f'<text x="{cx}" y="{cy-15}" font-size="20" text-anchor="middle">{icon}</text>\n'
        cy += 15
        
    res += f'<text class="title" x="{cx}" y="{cy+5}">{title}</text>\n'
    if subtitle:
        res += f'<text class="subtitle" x="{cx}" y="{cy+22}">{subtitle}</text>\n'
        
    return res

def arrow(x1, y1, x2, y2, label="", sublabel="", bend="none"):
    # Calculate mid
    cx, cy = (x1+x2)/2, (y1+y2)/2
    
    if bend == "horiz":
        path = f'<path d="M {x1} {y1} L {x1+20} {y1} L {x1+20} {y2} L {x2} {y2}" class="arrow" />'
        cx, cy = x1+20, (y1+y2)/2
    elif bend == "vert":
        path = f'<path d="M {x1} {y1} L {x1} {y1+20} L {x2} {y1+20} L {x2} {y2}" class="arrow" />'
        cx, cy = (x1+x2)/2, y1+20
    else:
        path = f'<line x1="{x1}" y1="{y1}" x2="{x2}" y2="{y2}" class="arrow" />'
        
    res = path + "\n"
    if label:
        res += f'<rect x="{cx-len(label)*4-10}" y="{cy-10}" width="{len(label)*8+20}" height="20" fill="white" rx="4" />\n'
        res += f'<text class="label" x="{cx}" y="{cy+4}">{label}</text>\n'
    if sublabel:
        res += f'<text class="sublabel" x="{cx}" y="{cy+18}">{sublabel}</text>\n'
    return res

# 1. Overall System Architecture
elements = (
    box(50, 50, 200, 100, "ESP32 / Simulator", "Data Source", "blue", "📡") +
    arrow(250, 100, 350, 100, "HTTP POST", "Wi-Fi") +
    box(350, 50, 200, 100, "Node.js + Express", "Backend Server", "green", "⚙️") +
    arrow(450, 150, 450, 220, "Persistence", "Save to DB") +
    box(350, 220, 200, 80, "MongoDB Atlas", "Cloud Database", "amber", "💾") +
    arrow(550, 100, 650, 100, "Memory Cache", "Update") +
    box(650, 50, 160, 100, "Latest Telemetry", "Node.js Memory", "gray", "⚡") +
    arrow(730, 150, 730, 220, "HTTP GET", "Every 200 ms") +
    box(650, 220, 160, 80, "React Dashboard", "Frontend User Interface", "purple", "📊")
)
generate_svg("overall-architecture", 900, 350, elements)

# 2. Complete Data Flow
elements = (
    box(50, 50, 180, 70, "Telemetry Generated", "Sensors/Simulator", "blue") +
    arrow(140, 120, 140, 170) +
    box(50, 170, 180, 70, "HTTP POST", "/api/telemetry", "gray") +
    arrow(140, 240, 140, 290) +
    box(50, 290, 180, 70, "Backend Validation", "Limits & Types", "green") +
    arrow(230, 325, 300, 325) +
    box(300, 290, 180, 70, "Power Calculation", "V × I = W", "green") +
    
    arrow(390, 290, 390, 240) +
    box(300, 170, 180, 70, "MongoDB Persistence", "Permanent Storage", "amber") +
    
    arrow(480, 325, 550, 325) +
    box(550, 290, 180, 70, "Memory Cache Update", "Latest Record", "green") +
    
    arrow(640, 290, 640, 240, "HTTP GET /latest") +
    box(550, 170, 180, 70, "React Dashboard", "Live Rendering", "purple")
)
generate_svg("data-flow", 800, 420, elements)

# 3. Live Dashboard Flow
elements = (
    box(50, 100, 180, 80, "React Dashboard", "Browser", "purple", "💻") +
    arrow(230, 120, 380, 120, "GET /api/telemetry/latest", "Every 200ms") +
    box(380, 80, 180, 120, "Express Backend", "Port 5000", "green", "⚙️") +
    arrow(560, 120, 680, 120, "Read") +
    box(680, 90, 150, 100, "Memory Cache", "Fast Access", "gray", "⚡") +
    arrow(680, 160, 560, 160, "Latest Record", "") + 
    arrow(380, 160, 230, 160, "JSON Response", "")
)
generate_svg("live-dashboard-flow", 900, 280, elements)

# 4. Simulator Flow
elements = (
    box(50, 50, 140, 70, "Simulator", "Starts", "blue") +
    arrow(190, 85, 250, 85) +
    box(250, 50, 180, 70, "Generate Measurement", "Smoothly varies", "gray") +
    arrow(430, 85, 490, 85) +
    box(490, 50, 160, 70, "POST Telemetry", "To backend", "green") +
    arrow(650, 85, 710, 85) +
    box(710, 50, 140, 70, "Wait 200 ms", "Hold", "amber") +
    
    '<path d="M 780 120 L 780 160 L 340 160 L 340 120" class="arrow" />\n' +
    '<rect x="480" y="150" width="160" height="20" fill="white" rx="4" />\n' +
    '<text class="label" x="560" y="164">Repeat 300 times</text>\n' +
    
    arrow(120, 120, 120, 200) +
    box(50, 200, 600, 70, "Switch Experiment (e.g. EXP-001 → EXP-002)", "After ~60 seconds", "purple") +
    '<path d="M 350 200 L 350 160" class="arrow" />\n'
)
generate_svg("simulator-flow", 900, 320, elements)

# 5. Current vs Future Architecture
elements = (
    '<text x="210" y="40" font-size="18" font-weight="bold" font-family="sans-serif" fill="#1e293b" text-anchor="middle">CURRENT (Simulator)</text>\n' +
    box(50, 70, 320, 70, "liveSimulator.js", "Software Mock", "blue") +
    arrow(210, 140, 210, 200, "HTTP POST") +
    box(50, 200, 320, 70, "Backend (Node.js + Express)", "localhost:5000", "green") +
    arrow(210, 270, 210, 330) +
    box(50, 330, 320, 60, "MongoDB Atlas", "", "amber") +
    arrow(370, 235, 470, 235, "← SAME →") +
    
    '<text x="630" y="40" font-size="18" font-weight="bold" font-family="sans-serif" fill="#1e293b" text-anchor="middle">FUTURE (Real Hardware)</text>\n' +
    box(470, 70, 320, 70, "ESP32-S3 Microcontroller", "Real Hardware Over Wi-Fi", "purple") +
    arrow(630, 140, 630, 200, "HTTP POST") +
    box(470, 200, 320, 70, "Backend (Node.js + Express)", "localhost:5000", "green") +
    arrow(630, 270, 630, 330) +
    box(470, 330, 320, 60, "MongoDB Atlas", "", "amber")
)
generate_svg("current-vs-future", 850, 420, elements)

print("SVGs generated successfully.")
