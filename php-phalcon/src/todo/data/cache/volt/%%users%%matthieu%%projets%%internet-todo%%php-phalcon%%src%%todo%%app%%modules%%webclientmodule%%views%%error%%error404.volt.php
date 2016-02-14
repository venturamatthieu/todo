<div class="container">

    <h1>404</h1>

    <p>Page not found</p>

    <?php if (true) { ?>
        <p>--------------------------<br>Debug mode error details:</p>
        <?php if (isset($e)) { ?>
            <p><?php echo $e->getMessage(); ?></p>
            <p><?php echo $e->getFile(); ?>::<?php echo $e->getLine(); ?></p>
            <pre><?php echo $e->getTraceAsString(); ?></pre>
        <?php } ?>
        <?php if ($message) { ?>
            <?php echo $message; ?>
        <?php } ?>
    <?php } ?>

</div>