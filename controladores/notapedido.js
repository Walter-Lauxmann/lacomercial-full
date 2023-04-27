function calcularPedido() {
    const codigo1 = document.getElementById('spancodigo1').innerHTML;
    const nombre1 = document.getElementById('spannombre1').innerHTML;
    const precio1 = parseFloat(document.getElementById('spanprecio1').innerHTML);
    const cantidad1 = document.getElementById('inputcantidad1').value;

    const codigo2 = document.getElementById('spancodigo2').innerHTML;
    const nombre2 = document.getElementById('spannombre2').innerHTML;
    const precio2 = parseFloat(document.getElementById('spanprecio2').innerHTML);
    const cantidad2 = document.getElementById('inputcantidad2').value;

    const codigo3 = document.getElementById('spancodigo3').innerHTML;
    const nombre3 = document.getElementById('spannombre3').innerHTML;
    const precio3 = parseFloat(document.getElementById('spanprecio3').innerHTML);
    const cantidad3 = document.getElementById('inputcantidad3').value;

    const codigo4 = document.getElementById('spancodigo4').innerHTML;
    const nombre4 = document.getElementById('spannombre4').innerHTML;
    const precio4 = parseFloat(document.getElementById('spanprecio4').innerHTML);
    const cantidad4 = document.getElementById('inputcantidad4').value;

    let total1 = cantidad1 * precio1;
    let total2 = cantidad2 * precio2;
    let total3 = cantidad3 * precio3;
    let total4 = cantidad4 * precio4;

    let totalPedido = total1 + total2 + total3 + total4;

    // Mostrar Resultados
    document.getElementById("codigo1").innerHTML = codigo1;
    document.getElementById("nombre1").innerHTML = nombre1;
    document.getElementById("cantidad1").innerHTML = cantidad1;
    document.getElementById("precio1").innerHTML = "$ " + precio1 + ".-";
    document.getElementById("total1").innerHTML = "$ " + total1 + ".-";
    
    document.getElementById("codigo2").innerHTML = codigo2;
    document.getElementById("nombre2").innerHTML = nombre2;
    document.getElementById("cantidad2").innerHTML = cantidad2;
    document.getElementById("precio2").innerHTML = "$ " + precio2 + ".-";
    document.getElementById("total2").innerHTML = "$ " + total2 + ".-";
    
    document.getElementById("codigo3").innerHTML = codigo3;
    document.getElementById("nombre3").innerHTML = nombre3;
    document.getElementById("cantidad3").innerHTML = cantidad3;
    document.getElementById("precio3").innerHTML = "$ " + precio3 + ".-";
    document.getElementById("total3").innerHTML = "$ " + total3 + ".-";
    
    document.getElementById("codigo4").innerHTML = codigo4;
    document.getElementById("nombre4").innerHTML = nombre4;
    document.getElementById("cantidad4").innerHTML = cantidad4;
    document.getElementById("precio4").innerHTML = "$ " + precio4 + ".-";
    document.getElementById("total4").innerHTML = "$ " + total4 + ".-";
    
    document.getElementById("totalpedido").innerHTML = "$ " + totalPedido + ".-";
}