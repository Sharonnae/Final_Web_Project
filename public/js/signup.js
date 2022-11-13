let roleField = document.getElementById('role')
roleField.addEventListener('change', function() {
    if (roleField.value === 'patient') {
        document.getElementById('expertise').innerHTML = ''
    } else {
        const type = [
            'Family medicine',
            'Internal Medicine',
            'Pediatrician',
            'Obstetricians/gynecologist (OBGYNs)',
            'Cardiologist',
            'Oncologist',
            'Gastroenterologist',
            'Pulmonologist',
            'Infectious disease',
            'Nephrologist',
            'Endocrinologist',
            'Ophthalmologist',
            'Otolaryngologist',
            'Dermatologist',
            'Psychiatrist',
            'Neurologist',
            'Radiologist',
            'Anesthesiologist',
            'Surgeon',
            'Physician executive'
        ]
        let options = '';
        type.forEach(function(item) {
            options += `<option value=${item}>${item}</option>`
        })
        document.getElementById('expertise').innerHTML = `
        <label class="form-control-label">EXPERTISE</label>
        <select name="expertise" class="form-control">
        ${options}
        </select>
        `
    }
})