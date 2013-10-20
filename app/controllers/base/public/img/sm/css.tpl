
.sm {
	background:url({{baseUrl}}{{fileName}}) no-repeat;
}

{{#sprites}}
.sm.{{name}} {
	width: {{width}}px; height: {{height}}px;
	background-position:-{{x}}px -{{y}}px;
}
{{/sprites}}
