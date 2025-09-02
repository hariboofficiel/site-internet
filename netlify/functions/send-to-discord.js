<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Formulaire Partenariat - Team NoxxWorks</title>
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-[#0f0f1a] text-gray-100 font-sans">

  <header class="text-center py-12 bg-gradient-to-r from-orange-500 to-pink-600 shadow-lg">
    <h1 class="text-4xl font-bold text-white">📌 Formulaire de Partenariat</h1>
    <p class="mt-2 text-lg text-white/90">Remplis le formulaire ci-dessous pour rejoindre notre réseau !</p>
  </header>

  <main class="max-w-4xl mx-auto p-8">
    <form id="partenariatForm" class="space-y-6 bg-[#1e1e2f] p-8 rounded-2xl shadow-lg">

      <!-- Informations serveur -->
      <h2 class="text-2xl font-bold text-orange-400">📝 Informations sur le serveur</h2>
      <input type="text" name="nom_serveur" placeholder="🏷️ Nom du serveur" class="w-full p-3 rounded bg-[#2a2a3c] text-white" required>
      <input type="text" name="theme" placeholder="🎨 Thème du serveur" class="w-full p-3 rounded bg-[#2a2a3c] text-white" required>
      <input type="date" name="date_creation" placeholder="📅 Date de création" class="w-full p-3 rounded bg-[#2a2a3c] text-white">
      <input type="number" name="membres_total" placeholder="👥 Nombre total de membres" class="w-full p-3 rounded bg-[#2a2a3c] text-white" required>
      <input type="number" name="membres_actifs" placeholder="🔔 Membres actifs (quotidien/hebdomadaire)" class="w-full p-3 rounded bg-[#2a2a3c] text-white">
      <input type="text" name="langue" placeholder="🌍 Langue principale" class="w-full p-3 rounded bg-[#2a2a3c] text-white">
      <input type="text" name="categorie" placeholder="🗂️ Catégorie principale" class="w-full p-3 rounded bg-[#2a2a3c] text-white">
      <input type="text" name="age_moyen" placeholder="🎯 Moyenne d’âge des membres" class="w-full p-3 rounded bg-[#2a2a3c] text-white">
      <textarea name="activites" placeholder="🎉 Activités proposées" class="w-full p-3 rounded bg-[#2a2a3c] text-white"></textarea>
      <input type="text" name="partenariats" placeholder="🤝 Avez-vous déjà des partenariats ?" class="w-full p-3 rounded bg-[#2a2a3c] text-white">
      <input type="text" name="frequence_annonces" placeholder="📢 Fréquence des annonces/partenariats" class="w-full p-3 rounded bg-[#2a2a3c] text-white">
      <input type="text" name="type_partenariat" placeholder="⚡ Type de partenariat souhaité" class="w-full p-3 rounded bg-[#2a2a3c] text-white">
      <input type="url" name="lien_invitation" placeholder="🔗 Lien d’invitation permanent" class="w-full p-3 rounded bg-[#2a2a3c] text-white">

      <!-- Informations staff -->
      <h2 class="text-2xl font-bold text-pink-400 mt-6">👤 Informations sur le staff / propriétaire</h2>
      <input type="text" name="pseudo" placeholder="🪪 Pseudo Discord" class="w-full p-3 rounded bg-[#2a2a3c] text-white" required>
      <input type="text" name="identifiant" placeholder="🆔 Identifiant Discord (@pseudo ou ID)" class="w-full p-3 rounded bg-[#2a2a3c] text-white" required>
      <input type="number" name="age" placeholder="🎂 Âge" class="w-full p-3 rounded bg-[#2a2a3c] text-white">
      <input type="text" name="role" placeholder="🛡️ Rôle dans le serveur" class="w-full p-3 rounded bg-[#2a2a3c] text-white">
      <input type="number" name="staff_nombre" placeholder="👨‍👩‍👧‍👦 Nombre de personnes dans le staff" class="w-full p-3 rounded bg-[#2a2a3c] text-white">
      <input type="text" name="disponibilite" placeholder="⏰ Disponibilité du staff" class="w-full p-3 rounded bg-[#2a2a3c] text-white">
      <input type="text" name="experience" placeholder="🧩 Expérience du staff" class="w-full p-3 rounded bg-[#2a2a3c] text-white">
      <textarea name="motivation" placeholder="💭 Pourquoi souhaitez-vous un partenariat ?" class="w-full p-3 rounded bg-[#2a2a3c] text-white"></textarea>
      <input type="text" name="contact_secondaire" placeholder="📞 Contact secondaire" class="w-full p-3 rounded bg-[#2a2a3c] text-white">
      <select name="conditions" class="w-full p-3 rounded bg-[#2a2a3c] text-white" required>
        <option value="">✅ Avez-vous lu et accepté les conditions ?</option>
        <option value="Oui">Oui</option>
        <option value="Non">Non</option>
      </select>
      <select name="engagement" class="w-full p-3 rounded bg-[#2a2a3c]
