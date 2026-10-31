# Cómo subir una versión nueva de Sodify

El QR y el link no cambian nunca. Solo se publica un Release nuevo.

1. En el `.csproj`, sube `ApplicationVersion` (siempre mayor que la anterior; hoy es 9, la próxima es 10).
2. Genera el APK en Release firmado con el mismo keystore, `diabetes.keystore`.
   Si cambia el keystore, Android no deja actualizar: habría que desinstalar la app primero.

   ```powershell
   dotnet publish -f net10.0-android -c Release -p:AndroidPackageFormat=apk -p:AndroidKeyStore=true -p:AndroidSigningKeyStore=diabetes.keystore -p:AndroidSigningKeyAlias=TU_ALIAS -p:AndroidSigningKeyPass=TU_CLAVE -p:AndroidSigningStorePass=TU_CLAVE
   ```

3. Toma `bin\Release\net10.0-android\publish\com.vil.diabetes-Signed.apk` y renómbralo exactamente `Sodify.apk`.
4. Entra a <https://github.com/Vilchezz12/sodify-descargas/releases> y toca **Draft a new release**.
5. Crea un tag nuevo (`v1.0.1`, `v1.0.2`…) y ponle ese mismo título.
6. Adjunta `Sodify.apk`.
7. Deja marcado **Set as the latest release** y toca **Publish release**.

La página muestra la versión nueva sola, sin tocar el código.

## Cambios en la página

Edita `index.html` y haz `git push`: Vercel la publica solo.
